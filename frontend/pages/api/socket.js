import { Server } from 'socket.io'

// An object to keep track of player choices
let playerChoices = {};

// An object to keep track of rooms
let rooms = {};

// Function to generate a random ID
function generateRandomId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to create a unique roomId
function createRoomId() {
  let roomId = generateRandomId(11); // Generate a random roomId
  while (roomId in rooms) { // Check if the roomId is already in the list
    roomId = generateRandomId(11); // Generate a new random roomId if it already exists
  }
  rooms[roomId] = roomId; // Add the new roomId to the list
  return roomId;
}

// Define a function to handle socket connections
const SocketHandler = (req, res) => {

  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    // Listen for socket connections
    io.on('connection', (socket) => {

      // Listen for 'player-choice' event
      socket.on('player-choice', (choice, id, roomId) => {
        playerChoices[id] = choice;
        const numPlayers = Object.keys(playerChoices).length;
        if (numPlayers === 2) {
          const player1 = Object.keys(playerChoices)[0];
          const player2 = Object.keys(playerChoices)[1];
          const choice1 = playerChoices[player1];
          const choice2 = playerChoices[player2];
          io.to(roomId).emit('update-choices', choice1, choice2, id);
          playerChoices = {};
        }
      })

      // Listen for 'create-room' event
      socket.on('create-room', ({ rounds, playerName }) => {

        let roomId = createRoomId();

        const room = {
          roomId: roomId,
          name: playerName,
          rounds: rounds,
          users: [],
          currentPlayer: null,
          currentRound: 1,
          board: [],
        };

        rooms[roomId] = room;

        socket.join(roomId)
        io.to(roomId).emit('room-created', roomId, rounds, playerName)
        console.log(`Room ${roomId} created`)
        console.log(rooms)
      })

      // Listen for 'join-room' event
      socket.on('join-room', (roomId, playerName, id) => {
        socket.join(roomId)
        io.to(roomId).emit('player-joined', roomId, playerName)
      })

      // Listen for 'player-has-joined' event
      socket.on('player-has-joined', (roomId, playerName, id) => {
        if (!rooms[roomId]) {
          socket.emit('room-not-found')
          return;
        }

        console.log(rooms)
        console.log(`roomId on joining player is ${roomId}`)
        let gameObj = rooms[roomId]
        socket.join(roomId)
        io.to(roomId).emit('start-game', playerName, gameObj.name, gameObj.rounds, id)
        console.log('The ultimate player has been joined')
      })

      // Listen for 'room-has-created' event
      socket.on('room-has-created', (roomId, playerName, rounds, id) => {
        if (!rooms[roomId]) {
          socket.emit('room-not-found')
          return;
        }

        socket.join(roomId)
        socket.emit('room-found')
      })

      // Listen for 'disconnect' event
      socket.on("disconnect", () => {
        Object.entries(rooms).forEach(([roomId, room]) => {
          const userIndex = room.users.indexOf(socket.id); // Find the index of the player
          if (userIndex !== -1) {
            room.users.splice(userIndex, 1); // Remove the user from the room
            delete rooms[roomId]; // Delete the room if the player disconnects
          }
        });
      });


    })
  }
  res.end()
}

export default SocketHandler

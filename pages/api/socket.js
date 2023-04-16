import { Server } from 'socket.io'

let playerChoices = {};
let rooms = {};

function generateRandomId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function createRoomId() {
  let roomId = generateRandomId(11); // Generate a random roomId
  while (roomId in rooms) { // Check if the roomId is already in the list
    roomId = generateRandomId(11); // Generate a new random roomId if it already exists
  }
  rooms[roomId] = roomId; // Add the new roomId to the list
  return roomId;
}

const SocketHandler = (req, res) => {

  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
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

      socket.on('join-room', (roomId, playerName, id) => {
        socket.join(roomId)
        io.to(roomId).emit('player-joined', roomId, playerName)
      })

      socket.on('player-has-joined', (roomId, playerName, id) => {
        if(!rooms[roomId]){
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

      socket.on('room-has-created', (roomId, playerName, rounds, id) => {
        if(!rooms[roomId]){
          socket.emit('room-not-found')
          return;
        }

        socket.join(roomId)
        socket.emit('room-found')
      })

      socket.on('message', () => {
        console.log('message received')
      })
    })
  }
  res.end()
}

export default SocketHandler

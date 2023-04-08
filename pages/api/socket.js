import { Server } from 'socket.io'

let playerChoices = {};
let rooms = [];

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      socket.on('player-choice', (choice, id) => {
        playerChoices[id] = choice;
        const numPlayers = Object.keys(playerChoices).length;
        if (numPlayers === 2) {
          const player1 = Object.keys(playerChoices)[0];
          const player2 = Object.keys(playerChoices)[1];
          const choice1 = playerChoices[player1];
          const choice2 = playerChoices[player2];
          io.to(player1).to(player2).emit('update-choices', choice1, choice2, id);
          playerChoices = {};
        }
      })

      socket.on('create-room', (rounds, playerName, roomId) => {
        console.log('create-room event triggered with rounds:', rounds, 'playerName:', playerName, 'and id:', id);
        socket.join(roomId)
        console.log(playerName)
      })

      socket.on('join-room', (roomId, playerName, id) => {
        socket.join(roomId)
        io.to(roomId).emit('player-joined', roomId, playerName)
      })

    })
  }
  res.end()
}

export default SocketHandler

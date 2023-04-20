import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { io } from 'socket.io-client';

const socket = io('http://localhost'); // Connect to the socket.io server
// Create a room
const createRoom = () => {
    const router = useRouter()

    // useEffect(() => {
    //     socketInitializer();
    //     return () => {
    //         if (socket) {
    //             socket.disconnect();
    //             socket.destroy();
    //         }
    //     };
    // }, []);

    // Check if socket is connected to server
    socket.on('connect', () => {
        console.log('connected')
        console.log(socket.id)
    })

    // listen for 'room-created' event
    socket.on('room-created', (roomId, rounds, playerName) => {
        router.push(`/${roomId}?rounds=${rounds}&name=${playerName}&id=${socket.id}&action=create`)
    })


    // Start the game
    const startGameBtn = () => {
        console.log('startGameBtn function called');
        const rounds = document.getElementById('rounds-input').value
        const playerName = document.getElementById('name-input').value

        if (rounds >= 1 && playerName.replace(/\s/g, '').length >= 1) {
            socket.emit('create-room', { rounds, playerName })
        }
    }

    return (
        <div id="input-div" className="flex flex-col items-center justify-center h-screen">
            <div id="input-container" className="flex flex-col items-center justify-center rounded-md shadow-lg dark:shadow-red-600 p-10">
                <h1 className="text-3xl font-bold mb-4">Rock Paper Scissors</h1>
                <div className="flex flex-col items-center justify-center mb-6">
                    <label htmlFor="rounds-input" className="text-lg font-semibold mb-2">Enter total rounds:</label>
                    <input id="rounds-input" type="number" min="1" className="px-4 py-2 text-lg border-b border-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-300 bg-transparent" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="name-input" className="text-lg font-semibold mb-2">Enter your name:</label>
                    <input id="name-input" type="text" className="px-4 py-2 text-lg border-b border-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-300 bg-transparent" />
                </div>

                <button id="start-game-btn" className="py-3 mt-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out" onClick={() => startGameBtn()}>Start Game</button>
            </div>
        </div>
    )
}

export default createRoom
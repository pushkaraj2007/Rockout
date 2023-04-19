import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
let socket;

const joinRoom = () => {
    const router = useRouter()
    const { roomId } = router.query

    useEffect(() => {
        socketInitializer();
        return () => {
            if (socket) {
                socket.disconnect();
                socket.destroy();
            }
        };
    }, []);

    // Initalize the socket
    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io('https://rockout.vercel.app')

        socket.on('connect', () => {
            console.log('connected')
            console.log(socket.id)
        })

        socket.on('player-joined', (roomId, playerName) => {
            router.push(`/${roomId}?name=${playerName}&id=${socket.id}&action=join`)
        })
    }

    // Start the game
    const startGameBtn = () => {
        console.log('startGameBtn function called');
        const roomId = document.getElementById('roomId-input').value
        const playerName = document.getElementById('name-input').value
        socket.emit('join-room', roomId, playerName, socket.id)
    }

    return (
        <div id="input-div" className="flex flex-col items-center justify-center h-screen">
            <div id="input-container" className="flex flex-col items-center justify-center rounded-md shadow-lg p-10 dark:shadow-red-600">
                <h1 className="text-3xl font-bold mb-4">Rock Paper Scissors</h1>
                <div className="flex flex-col items-center justify-center mb-6">
                    <label htmlFor="roomId-input" className="text-lg font-semibold mb-2">Enter Room Id:</label>
                    <input id="roomId-input" type="text" min="1" value={roomId} className="px-4 py-2 text-lg border-b border-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-300 bg-transparent" />
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

export default joinRoom
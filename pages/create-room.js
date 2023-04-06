import React from 'react'

const createRoom = () => {
    return (
        <div id="input-div" className="flex flex-col items-center justify-center h-screen">
            <div id="input-container" className="flex flex-col items-center justify-center rounded-md shadow-lg p-10 bg-white">
                <h1 className="text-3xl font-bold mb-4">Rock Paper Scissors</h1>
                <div className="flex flex-col items-center justify-center mb-6">
                    <label htmlFor="rounds-input" className="text-lg font-semibold mb-2">Enter total rounds:</label>
                    <input id="rounds-input" type="number" min="1" className="px-4 py-2 text-lg border-b border-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-300" />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="name-input" className="text-lg font-semibold mb-2">Enter your name:</label>
                    <input id="name-input" type="text" className="px-4 py-2 text-lg border-b border-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-300" />
                </div>

                <button id="start-game-btn" className="py-3 mt-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out" onClick={() => startGameBtn()}>Start Game</button>
            </div>
        </div>
    )
}

export default createRoom
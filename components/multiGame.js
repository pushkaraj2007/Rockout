import React, { useState, useEffect } from "react";
import io from "socket.io-client";
let socket;

const multiGame = () => {

    const [playerChoice, setPlayerChoice] = useState(null)
    const [opponentChoice, setOpponentChoice] = useState(null)
    const [numPlayersReady, setNumPlayersReady] = useState(0);

    useEffect(() => {
        socketInitializer();
        return () => {
            if (socket) {
                socket.disconnect();
                socket.destroy();
            }
        };
    }, []);


    const socketInitializer = async () => {
        await fetch('/api/socket')
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
            console.log(socket.id)
        })

        socket.on('update-choices', (choice1, choice2, id) => {
            console.log(choice1)
            console.log(choice2)
            if (id !== socket.id) {
                setOpponentChoice(choice2);
            }
            else {
                setOpponentChoice(choice1)
            }
        })

    }

    // useEffect(()=>{
    //     if(opponentChoice !== null && winner !== null){
    //         // To reset the opponent and winner once player has selected choice
    //         opponentChoice == null
    //         winner == null
    //     }

    // }, [playerChoice])

    const handleplayerChoice = (choice) => {
        console.log('called')
        setPlayerChoice(choice);
        socket.emit("player-choice", choice, socket.id);
        setNumPlayersReady(numPlayersReady + 1);
    };

    return (
        <>

            <div className="flex justify-center mt-28">
                <div className="border-2 border-black border-solid h-60 w-[80%] flex flex-col">
                    <div id="container">
                        <div className="flex justify-center mt-3">
                            <h1 className="font-bold text-4xl">Round {}</h1>
                        </div>
                        <div className="flex justify-between items-center w-[100%] mt-4">
                            <div className="ml-5">
                                <p className="font-bold text-3xl">You</p>
                                <div className="flex justify-center">
                                    <p className="mt-3 font-bold text-green-600 text-5xl">{}</p>
                                </div>
                            </div>
                            <div className="mr-5">
                                <p className="font-bold text-3xl">Opponent</p>
                                <div className="flex justify-center">
                                    <p className="mt-3 font-bold text-green-600 text-5xl">{}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="finalResultDiv" className="h-[100%] w-[100%] hidden justify-center items-center">
                        <h1 id="finalResultText" className="text-4xl">Initial</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-8">
                <h1 className="text-3xl font-bold mb-8">Rock Paper Scissors</h1>
                <div className="flex">
                    <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4" onClick={() => handleplayerChoice('rock')}>
                        Rock
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4" onClick={() => handleplayerChoice('paper')}>
                        Paper
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4" onClick={() => handleplayerChoice('scissors')}>
                        Scissors
                    </button>
                </div>
                <div className="flex flex-col items-center mt-8">
                    <p className="text-2xl font-bold">You chose: {playerChoice}</p>
                    <p className="text-2xl font-bold">Opponent chose: {opponentChoice}</p>
                    <p className="text-3xl font-bold mt-4">{}</p>
                </div>
            </div>
        </>
    )
}

export default multiGame
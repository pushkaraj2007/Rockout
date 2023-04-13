import { useState, useEffect } from 'react';

const CHOICES = ['rock', 'paper', 'scissors'];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds, setTotalRounds] = useState(5)
  const [winner, setWinner] = useState(null);
  const [isClient, setIsClient] = useState(false)
  const [isGameSection, setIsGameSection] = useState(false)

  useEffect(() => {
    if (isGameSection) {
      document.onkeydown = (e) => {
        if (e.key == "1") { handleUserChoice('rock') }
        if (e.key == "2") { handleUserChoice('paper') }
        if (e.key == "3") { handleUserChoice('scissors') }
      }
    }
  })

  useEffect(() => {
    if (round >= totalRounds) {
      let finalResultDiv = document.getElementById('finalResultDiv')
      let finalResulText = document.getElementById('finalResultText')
      let container = document.getElementById('container')
      let resetBtn = document.getElementById('reset-btn')

      if (userScore > computerScore) {
        container.style.display = 'none'
        finalResultDiv.style.display = 'flex'
        finalResulText.innerText = 'You Won!'
        finalResulText.style.color = 'green'
        resetBtn.classList.remove('hidden')
        resetBtn.classList.add('flex')
      }
      else {
        container.style.display = 'none'
        finalResultDiv.style.display = 'flex'
        finalResulText.innerText = 'Computer Won!'
        finalResulText.style.color = 'red'
        resetBtn.classList.remove('hidden')
        resetBtn.classList.add('flex')
      }

      return;
    }

    const determineWinner = () => {
      if (userChoice && computerChoice) {
        if (userChoice === computerChoice) {
          setWinner('Tie');
        } else if (
          (userChoice === 'rock' && computerChoice === 'scissors') ||
          (userChoice === 'paper' && computerChoice === 'rock') ||
          (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
          setWinner('You win!');
          setUserScore((prevScore) => prevScore + 1);
          setRound((prevRound) => prevRound + 1);
        } else {
          setWinner('Computer wins!');
          setComputerScore((prevScore) => prevScore + 1);
          setRound((prevRound) => prevRound + 1);
        }
      }
    };

    determineWinner();
  }, [userChoice, computerChoice]);

  const handleUserChoice = (choice) => {
    const computerChoice2 = CHOICES[Math.floor(Math.random() * CHOICES.length)];
    setUserChoice(choice);
    setComputerChoice(computerChoice2);
  };

  const handleResetBtn = () => {
    let finalResultDiv = document.getElementById('finalResultDiv')
    let container = document.getElementById('container')
    let resetBtn = document.getElementById('reset-btn')

    setComputerChoice(null)
    setComputerScore(0)
    setRound(1)
    setTotalRounds(5)
    setUserChoice(null)
    setUserScore(0)
    setWinner(null)

    container.style.display = 'block'
    finalResultDiv.style.display = 'none'
    resetBtn.classList.remove('flex')
    resetBtn.classList.add('hidden')
  }

  // Run after DOM is loaded
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Run after clicking Start Game button
  async function startGameBtn() {
    if (isClient) {
      const roundsInput = document.getElementById('rounds-input')
      const inputSection = document.getElementById('input-div')
      const gameSection = document.getElementById('game-section')

      // Check if player has entered value or not
      if (roundsInput.value.replace(/\s/g, '') > 1) {

        inputSection.id = 'input-section'
        setTotalRounds(roundsInput.value)

        inputSection.addEventListener('animationend', () => {
          gameSection.classList.remove('hidden')
          gameSection.classList.add('block')
          setIsGameSection(true)
          inputSection.classList.add('hidden')
        })
      }
    }
  }

  return (
    <>
      <div id="game-section" className="hidden">
        <div className="flex justify-center mt-28">
          <div className="border-2 border-black dark:border-white border-solid h-60 w-[80%] flex flex-col">
            <div id="container">
              <div className="flex justify-center mt-3">
                <h1 className="font-bold text-4xl">Round {round}</h1>
              </div>
              <div className="flex justify-between items-center w-[100%] mt-4">
                <div className="ml-5">
                  <p className="font-bold text-3xl">You</p>
                  <div className="flex justify-center">
                    <p className="mt-3 font-bold text-green-600 text-5xl">{userScore}</p>
                  </div>
                </div>
                <div className="mr-5">
                  <p className="font-bold text-3xl">Computer</p>
                  <div className="flex justify-center">
                    <p className="mt-3 font-bold text-green-600 text-5xl">{computerScore}</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="finalResultDiv" className="h-[100%] w-[100%] mt-7 hidden justify-center items-center">
              <h1 id="finalResultText" className="text-4xl">Initial</h1>
            </div>

            <div id='reset-btn' className='width-[100%] mb-6 justify-center items-center hidden'>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded" onClick={() => handleResetBtn()}>
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          <h1 className="text-3xl font-bold">Rock Paper Scissors</h1>
          <div className="flex mt-8">
            <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4 dark:text-black" onClick={() => handleUserChoice("rock")}>
              Rock
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4 dark:text-black" onClick={() => handleUserChoice("paper")}>
              Paper
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4 dark:text-black" onClick={() => handleUserChoice("scissors")}>
              Scissors
            </button>
          </div>
          <div className="flex flex-col items-center mt-8">
            <p className="text-2xl font-bold">You chose: {userChoice}</p>
            <p className="text-2xl font-bold">Computer chose: {computerChoice}</p>
            <p className="text-3xl font-bold mt-4">{winner}</p>
          </div>
        </div>
      </div>

      <div id="input-div" className="flex flex-col items-center justify-center h-screen">
        <div id="input-container" className="flex flex-col items-center justify-center rounded-md shadow-lg p-10 bg-white">
          <h1 className="text-3xl font-bold mb-4">Rock Paper Scissors</h1>
          <div className="flex flex-col items-center justify-center mb-6">
            <label htmlFor="rounds-input" className="text-lg font-semibold mb-2">Enter total rounds:</label>
            <input id="rounds-input" type="number" min="1" className="px-4 py-2 text-lg border-b border-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-300" />
          </div>
          <button id="start-game-btn" className="py-3 mt-2 px-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out" onClick={() => startGameBtn()}>Start Game</button>
        </div>
      </div>
    </>
  );
};


export default Game;
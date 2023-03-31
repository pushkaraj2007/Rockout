import { useState, useEffect } from 'react';

const CHOICES = ['rock', 'paper', 'scissors'];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [winner, setWinner] = useState(null);


  useEffect(() => {
    if (round >= 5) {
      let finalResultDiv = document.getElementById('finalResultDiv')
      let finalResulText = document.getElementById('finalResultText')
      let container = document.getElementById('container')

      if (userScore > computerScore) {
        container.style.display = 'none'
        finalResultDiv.style.display = 'flex'
        finalResulText.innerText = 'You Won!'
        finalResulText.style.color = 'green'
      }
      else {
        container.style.display = 'none'
        finalResultDiv.style.display = 'flex'
        finalResulText.innerText = 'Computer Won!'
        finalResulText.style.color = 'red'
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

  return (
    <>
      <div className="flex justify-center mt-28">
        <div className="border-2 border-black border-solid h-60 w-[80%] flex flex-col">
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
          <div id="finalResultDiv" className="h-[100%] w-[100%] hidden justify-center items-center">
            <h1 id="finalResultText" className="text-4xl">Initial</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-3xl font-bold mb-8">Rock Paper Scissors</h1>
        <div className="flex">
          <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4" onClick={() => handleUserChoice("rock")}>
            Rock
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4" onClick={() => handleUserChoice("paper")}>
            Paper
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-xl font-bold py-4 px-8 rounded-md mr-4" onClick={() => handleUserChoice("scissors")}>
            Scissors
          </button>
        </div>
        <div className="flex flex-col items-center mt-8">
          <p className="text-2xl font-bold">You chose: {userChoice}</p>
          <p className="text-2xl font-bold">Computer chose: {computerChoice}</p>
          <p className="text-3xl font-bold mt-4">{winner}</p>
        </div>
      </div>
    </>
  );
};


export default Game;
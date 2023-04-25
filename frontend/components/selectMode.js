import React from 'react';
import Link from 'next/link';

const SelectMode = () => {
  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center rounded-lg shadow-lg p-8 mx-4 transform hover:-translate-y-2 transition-all duration-300 ease-in-out mt-28 dark:shadow-blue-600">
        <h2 className="text-3xl font-bold mb-4">SinglePlayer</h2>
        <p className="text-lg text-center mb-6">
          Play against the computer and test your luck! <br />
          The computer randomly selects between Rock, Paper and Scissors.
        </p>
        <Link href="/singleplayer">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
            Play Now {'->'}
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg shadow-lg p-8 mx-4 transform hover:-translate-y-2 transition-all duration-300 ease-in-out mt-0 dark:shadow-red-600">
        <h2 className="text-3xl font-bold mb-4">MultiPlayer</h2>
        <p className="text-lg text-center mb-6">
          Play against real players across the world and fight for the win! <br />
          You can even invite your friends for the battle or play with a random player.
        </p>

        <div className='flex justify-around w-[100%]'>
          <Link href="/create-room">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Create a room
            </button>
          </Link>

          <Link href="/join-room">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
              Join a room
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectMode;

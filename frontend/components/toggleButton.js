import { useState, useEffect } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (darkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle dark mode
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className="h-8 w-8 rounded-full bg-gray-400 p-1 cursor-pointer flex items-center mr-7"
      onClick={handleToggle}
    >
      {darkMode ? <FaMoon className="text-gray-800 h-7 w-7" /> : <FaSun className="text-yellow-500 h-7 w-7" />}
    </div>
  );
};

export default ThemeToggle;

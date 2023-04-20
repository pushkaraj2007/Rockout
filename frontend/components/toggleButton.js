import { useState, useEffect } from "react";

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
      className="w-12 h-6 bg-gray-400 rounded-full p-1 cursor-pointer flex items-center mr-4"
      onClick={handleToggle}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-500 ease-in-out ${
          darkMode ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
};

export default ThemeToggle;
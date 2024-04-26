import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import React, { useState } from "react";

const Switch = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || false
  );

  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", true);
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("darkMode");
  }

  return (
    <div className="flex col-span-1 justify-end">
      <button
        type="button"
        title="Toggle dark/light mode"
        onClick={() => setDarkMode(!darkMode)}
        className="flex items-center p-2 mr-2 text-xs font-medium text-gray-700 rounded-lg border border-purple-400 toggle-dark-state-example bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-purple-600 dark:hover:text-white dark:hover:bg-purple-300"
      >
        {darkMode ? (
          <FaSun  className="fill-current h-4 w-4" />
        ) : (
          <BsFillMoonStarsFill className="fill-current h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default Switch;

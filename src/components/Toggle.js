import React, { useContext, useState } from "react";
import { themeContext } from "./ThemeProvider";

const Toggle = ({toggleScroll}) => {
  const { toggleTheme } = useContext(themeContext);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mt-2 ">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            onClick={toggleTheme}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:bg-red-500 dark:peer-focus:bg-red-400 rounded-full peer dark:bg-red-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-red-500 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-red-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-red-500 peer-checked:bg-red-400"></div>
        </label>
        <p className="ms-3 text-sm font-medium text-gray-50 dark:text-red-400">
          Change theme
        </p>
      </div>
      <div className="flex flex-col items-center mt-2 ">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            onClick={toggleScroll}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:bg-red-500 dark:peer-focus:bg-red-400 rounded-full peer dark:bg-red-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-red-500 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-red-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-red-500 peer-checked:bg-red-400"></div>
        </label>
        <p className="ms-3 text-sm font-medium text-gray-50 dark:text-red-400">
          Change to scroll
        </p>
      </div>
    </div>
  );
};

export default Toggle;

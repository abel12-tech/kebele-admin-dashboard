import React, { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

    
  const initializeDarkMode = () => {
    const theme = localStorage.getItem('theme');
    setIsDarkMode(theme === 'dark');
  };


  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => {
      const newState = !prevState;
      localStorage.setItem("theme", newState ? "dark" : "light");
      return newState;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode ,initializeDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

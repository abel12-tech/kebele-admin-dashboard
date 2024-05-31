import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useDarkMode } from "./darkModeContext";


const Layout = ({ children }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { isDarkMode } = useDarkMode();

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  return (
    <div
      className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <Sidebar isSideMenuOpen={isSideMenuOpen} />
      <div className="flex flex-col flex-1 w-full">
        <Header toggleSideMenu={toggleSideMenu} />
        {children}
      </div>
    </div>
  );
};

export default Layout;

import React, { useEffect } from "react";
import { useDarkMode } from "../shared/darkModeContext";
import { MdOutlineCategory } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";

const MainContent = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  return (
    <main
      className={`h-full overflow-y-auto ${
        isDarkMode ? "dark" : "bg-gray-100"
      }`}
    >
      <div className="container px-6 mx-auto grid">
        <h2
          className={`my-6 text-2xl font-semibold ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }  `}
        >
          Dashboard
        </h2>
        {/* CTA */}

        {/* Cards */}
        <div className={`grid gap-6 mb-8 md:grid-cols-2`}>
          {/* Card */}
          <div
            className={`flex items-center p-4 rounded-lg shadow-xs  ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <MdPeopleOutline className="w-7 h-7" />
            </div>
            <div>
              <p
                className={`mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Residents
              </p>
              <p
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                2
              </p>
            </div>
          </div>
          {/* Card */}
          <div
            className={`flex items-center p-4 rounded-lg shadow-xs  ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <MdOutlineCategory className="w-7 h-7" />
            </div>
            <div>
              <p
                className={`mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                New Registered user
              </p>
              <p
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                2
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;

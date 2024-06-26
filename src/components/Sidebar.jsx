import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../shared/darkModeContext";
import { MdOutlineDashboard } from "react-icons/md";
import { selectAdminInfo } from "./features/authentication/slice/authSlice";
import { FiUsers } from "react-icons/fi";
import { CiSquareQuestion } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";

const Sidebar = ({ isSideMenuOpen }) => {
  const [activeLink, setActiveLink] = useState("/");
  const adminInfo = useSelector(selectAdminInfo);
  const { isDarkMode } = useDarkMode();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const role = adminInfo?.role ?? "";

  return (
    <aside
      className={`${
        isSideMenuOpen ? "block" : "hidden"
      } z-20 w-64 overflow-y-auto ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } md:block flex-shrink-0`}
    >
      <div
        className={`py-4 h-screen ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`ml-6 text-lg font-bold ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Dashboard
        </Link>

        {/* Navigation links */}
        <ul className="mt-6">
          <li className="relative px-6 py-3">
            {activeLink === "/" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                isDarkMode
                  ? "text-gray-100 dark:hover:text-gray-200"
                  : "text-gray-800 dark:hover:text-gray-600"
              }`}
            >
              <MdOutlineDashboard className="w-5 h-5" />
              <span className="ml-4">Dashboard</span>
            </Link>
          </li>
        </ul>

        <ul>
          {role === "Super Admin" ? (
            <li className="relative px-6 py-3">
              {activeLink === "/manage-residents" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <Link
                to="/manage-residents"
                onClick={() => handleLinkClick("/manage-residents")}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                  isDarkMode
                    ? "dark:hover:text-gray-200"
                    : "text-gray-800 dark:hover:text-gray-600"
                }`}
              >
                <FiUsers className="w-6 h-6" />
                <span className="ml-4">Manage Residents</span>
              </Link>
            </li>
          ) : (
            <li className="relative px-6 py-3">
              {activeLink === "/manage-residents-in-kebele" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <Link
                to="/manage-residents-in-kebele"
                onClick={() => handleLinkClick("/manage-residents-in-kebele")}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                  isDarkMode
                    ? "dark:hover:text-gray-200"
                    : "text-gray-800 dark:hover:text-gray-600"
                }`}
              >
                <FiUsers className="w-6 h-6" />
                <span className="ml-4">Manage Resident In Kebele</span>
              </Link>
            </li>
          )}
          {role === "Super Admin" ? (
            <li className="relative px-6 py-3">
              {activeLink === "/manage-requests-for-new-id" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <Link
                to="/manage-requests-for-new-id"
                onClick={() => handleLinkClick("/manage-requests-for-new-id")}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                  isDarkMode
                    ? "dark:hover:text-gray-200"
                    : "text-gray-800 dark:hover:text-gray-600"
                }`}
              >
                <CiSquareQuestion className="w-6 h-6" />
                <span className="ml-4">Manage Requests For New Id</span>
              </Link>
            </li>
          ) : (
            <li className="relative px-6 py-3">
              {activeLink === "/manage-requests-in-kebele" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <Link
                to="/manage-requests-in-kebele"
                onClick={() => handleLinkClick("/manage-requests-in-kebele")}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                  isDarkMode
                    ? "dark:hover:text-gray-200"
                    : "text-gray-800 dark:hover:text-gray-600"
                }`}
              >
                <CiSquareQuestion className="w-6 h-6" />
                <span className="ml-4">Manage Requests In Kebele</span>
              </Link>
            </li>
          )}
          {/*  */}
          {role === "Super Admin" ? (
            <li className="relative px-6 py-3">
              {activeLink === "/manage-renewal-requests" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <Link
                to="/manage-renewal-requests"
                onClick={() => handleLinkClick("/manage-renewal-requests")}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                  isDarkMode
                    ? "dark:hover:text-gray-200"
                    : "text-gray-800 dark:hover:text-gray-600"
                }`}
              >
                <CiSquareQuestion className="w-6 h-6" />
                <span className="ml-4">Manage Renewal Requests</span>
              </Link>
            </li>
          ) : (
            <li className="relative px-6 py-3">
              {activeLink === "/manage-renewal-requests-in-kebele" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <Link
                to="/manage-renewal-requests-in-kebele"
                onClick={() => handleLinkClick("/manage-requests-in-kebele")}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                  isDarkMode
                    ? "dark:hover:text-gray-200"
                    : "text-gray-800 dark:hover:text-gray-600"
                }`}
              >
                <CiSquareQuestion className="w-6 h-6" />
                <span className="ml-4">Manage Renewal Requests In Kebele</span>
              </Link>
            </li>
          )}
          {/*  */}
          {role === "Super Admin" ? (
            <li className="relative px-6 py-3">
              {activeLink === "/manage-admins" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <Link
                to="/manage-admins"
                onClick={() => handleLinkClick("/manage-admins")}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                  isDarkMode
                    ? "dark:hover:text-gray-200"
                    : "text-gray-800 dark:hover:text-gray-600"
                }`}
              >
                <MdOutlineAdminPanelSettings className="w-6 h-6" />
                <span className="ml-4">Manage Admins</span>
              </Link>
            </li>
          ) : (
            ""
          )}
          {role === "Super Admin" ? (
            <li className="relative px-6 py-3">
              {activeLink === "/manage-kebeles" && (
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              )}
              <Link
                to="/manage-kebeles"
                onClick={() => handleLinkClick("/manage-kebeles")}
                className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                  isDarkMode
                    ? "dark:hover:text-gray-200"
                    : "text-gray-800 dark:hover:text-gray-600"
                }`}
              >
                <MdOutlineAdminPanelSettings className="w-6 h-6" />
                <span className="ml-4">Manage Kebeles</span>
              </Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

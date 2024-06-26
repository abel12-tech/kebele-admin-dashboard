import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDarkMode } from "../../../../shared/darkModeContext";
import { useChangePasswordMutation } from "../api/authApi";

const ChangePassword = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password changed successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Failed to change password:", err);
      toast.error("Failed to change password");
    }
  };

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  return (
    <div
      className={`h-full overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center mt-10 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          } p-6 rounded-lg shadow-md max-w-md`}
        >
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-500">
              Change Password
            </h1>
            <p className="text-gray-500">
              Enter your old and new passwords below
            </p>
          </div>
          <ToastContainer position="top-right" duration={2000} />
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#9333EA] hover:bg-[#c190ee] text-white font-semibold py-2 px-4 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>
            </div>
            {isError && (
              <p className="mt-4 text-red-500">Error: {error.message}</p>
            )}
          </form>
          {isSuccess && (
            <p className="mt-4 text-green-500">
              Password changed successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

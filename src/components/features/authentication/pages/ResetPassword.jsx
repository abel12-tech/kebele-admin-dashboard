import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../../shared/darkModeContext";
import { useResetPasswordMutation } from "../api/authApi";

const ResetPassword = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword({ token, newPassword }).unwrap();
      console.log(res);
      console.log("Password reset successfully");
      navigate("/login"); 
    } catch (err) {
      console.error("Failed to reset password:", err);
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
            <h1 className="text-2xl font-bold text-gray-500">Reset Password</h1>
            <p className="text-gray-500">Enter your new password below</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
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
                onChange={handlePasswordChange}
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
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
          {isSuccess && (
            <p className="mt-4 text-green-500">Password reset successfully!</p>
          )}
          {isError && (
            <p className="mt-4 text-red-500">Error: {error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

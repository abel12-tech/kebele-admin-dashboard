import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../../../shared/darkModeContext";
import { useForgetPasswordMutation } from "../api/authApi";

const ForgetPassword = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const [phoneNumber, setPhonenumber] = useState("");
  const [forgetPassword, { isLoading, isSuccess, isError, error }] =
    useForgetPasswordMutation();

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  const handlePhoneChange = (e) => {
    setPhonenumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgetPassword({ phoneNumber }).unwrap();
      console.log("Reset link sent to your Email ,Check it:", phoneNumber);
    } catch (err) {
      console.error("Failed to send reset link:", err);
    }
  };

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
              Forget Password
            </h1>
            <p className="text-gray-500">
              Enter your phone number to receive a reset link
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneChange}
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
                {isLoading ? "Sending..." : "Send To Recieve Reset Link"}
              </button>
            </div>
          </form>
          {isSuccess && (
            <p className="mt-4 text-green-500">Reset link sent successfully!</p>
          )}
          {isError && (
            <p className="mt-4 text-red-500">Error: {error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

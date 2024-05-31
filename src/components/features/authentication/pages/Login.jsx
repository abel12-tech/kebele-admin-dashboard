import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authApi";
import { setToken } from "../slice/authSlice";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logging, setLogging] = useState(false);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
      setLogging(true);
      const response = await login({
        phoneNumber,
        password,
      });

      setLogging(false);

      const data = response.data.data;

      dispatch(setToken(data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError("Invalid phone number or password");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center flex-col overflow-y-auto md:flex-row">
          <div className="flex border-1 rounded-lg dark:bg-gray-800 items-center justify-center p-6 sm:p-12 md:w-3/5">
            <div className="w-full">
              <h1 className="mb-4 text-center text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <label className="block text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Phone Number
                </span>
                <input
                  className="bg-gray-700 border-gray-700 text-white text-sm rounded-lg outline-none block w-full p-2.5"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </label>
              <label className="block mt-4 text-sm">
                <span className="text-gray-700 dark:text-gray-400">
                  Password
                </span>
                <input
                  className="bg-gray-700 border-gray-700 text-white text-sm rounded-lg outline-none block w-full p-2.5"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {error && <p className="text-red-500">{error}</p>}
              <button
                onClick={handleLogin}
                className="block w-full mt-8 px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                {logging ? "login..." : "Log in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

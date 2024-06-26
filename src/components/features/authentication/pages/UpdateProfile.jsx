import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../api/authApi";
import { selectAdminInfo, updateAdminInfo } from "../slice/authSlice";
import { useDarkMode } from "../../../../shared/darkModeContext";

const UpdateProfile = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const adminInfo = useSelector(selectAdminInfo);
  const [firstName, setFirstName] = useState(
    adminInfo ? adminInfo.firstName : ""
  );
  const [lastName, setLastName] = useState(adminInfo ? adminInfo.lastName : "");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const navigate = useNavigate();

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  useEffect(() => {
    setFirstName(adminInfo ? adminInfo.firstName : "");
    setLastName(adminInfo ? adminInfo.lastName : "");
  }, [adminInfo]);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        _id: adminInfo._id,
        firstName: firstName,
        lastName: lastName,
      });

      dispatch(updateAdminInfo(res));

      toast.success("Profile updated successfully");
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
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
        <ToastContainer position="top-right" duration={2000} />
        <div
          className={`${
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          } p-6 rounded-lg shadow-md max-w-md`}
        >
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-500">Update Profile</h1>
            <p className="text-gray-500">
              Update your profile information below
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
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
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

import React, { useEffect } from "react";
import { useDarkMode } from "../../../../shared/darkModeContext";

const Profile = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();

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
          <div className="mb-4">
            <img
              src="https://media.istockphoto.com/id/2103913969/photo/chair-and-table-covered-with-autumn-colored-leaves-under-a-street-lamp-on-an-autumn-night.jpg?s=1024x1024&w=is&k=20&c=6Rl5_t2kq4oZtlrEqtcoTT16ze_piEXh1JfGJdluL8w="
              alt="Cover"
              className="w-full rounded-t-lg"
            />
          </div>
          <div className="flex items-center justify-center -mt-16">
            <img
              src=""
              alt="Profile"
              className="w-32 object-cover h-32 rounded-full border-4 border-white shadow-md"
            />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold text-gray-500">Hjjj</h1>
            <p className="text-gray-500">Admin</p>
          </div>
          <div className="mt-6">
            <Link to={`/update-profile/`}>
              <button className="w-full bg-[#9333EA] hover:bg-[#c190ee] text-white font-semibold py-2 px-4 rounded">
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

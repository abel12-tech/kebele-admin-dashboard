import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../../shared/darkModeContext";
import { useAddAdminMutation, useGetKebelesQuery } from "../api/adminApi";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const AddAdminForKebele = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [kebele, setKebele] = useState("");
  const [adding, setAdding] = useState(false);
  const [addAdmin] = useAddAdminMutation();
  const { data: kebeles, isLoading: isKebeleLoading } = useGetKebelesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setAdding(true);

      let profileUrl = "";
      if (profile) {
        const profileRef = ref(
          storage,
          `profile-images/${profile.name + v4()}`
        );
        await uploadBytes(profileRef, profile);
        profileUrl = await getDownloadURL(profileRef);
      }

      await addAdmin({
        firstName,
        lastName,
        profile: profileUrl,
        email,
        username,
        phoneNumber,
        kebele,
      });

      setFirstName("");
      setLastName("");
      setProfile("");
      setEmail("");
      setUsername("");
      setPhoneNumber("");
      setKebele("");
      setAdding(false);
      navigate("/manage-admins");
      window.location.reload();
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div
      className={`h-full overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full pb-16">
          <div className="container px-6 mx-auto grid">
            <h4
              className={`mb-4 text-center p-4 text-lg font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Add Admin for Kebele
            </h4>
            <form onSubmit={handleSubmit}>
              <div
                className={`px-4 py-3 mb-8 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-md`}
              >
                <label className="block text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    First Name
                  </span>
                  <input
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Last Name
                  </span>
                  <input
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Profile Image
                  </span>
                  <input
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    type="file"
                    onChange={(e) => setProfile(e.target.files[0])}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Email
                  </span>
                  <input
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Username
                  </span>
                  <input
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Phone Number
                  </span>
                  <input
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Kebele
                  </span>
                  <select
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    value={kebele}
                    onChange={(e) => setKebele(e.target.value)}
                    disabled={isKebeleLoading}
                  >
                    <option value="">Select Kebele</option>
                    {kebeles?.map((kebele) => (
                      <option key={kebele.id} value={kebele.id}>
                        {kebele.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  className="mt-4 bg-[#9333EA] hover:bg-[#c190ee] text-white font-semibold py-2 px-4 rounded"
                >
                  {adding ? "Adding..." : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddAdminForKebele;

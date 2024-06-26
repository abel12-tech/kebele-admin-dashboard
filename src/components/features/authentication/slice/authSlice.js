import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

// Helper function to parse JSON from localStorage safely
const parseLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return null;
  }
};

const initialState = {
  token: Cookies.get("token") || null,
  isAuthenticated: parseLocalStorageItem("isAuthenticated") || false,
  adminInfo: parseLocalStorageItem("adminInfo") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload.admin));
      localStorage.setItem("isAuthenticated", true);
      Cookies.set("token", state.token);
    },
    updateAdminInfo: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("adminInfo", JSON.stringify(action.payload.data));
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem("adminInfo");
      Cookies.remove("token");
    },
  },
});

export const { setToken, logout, updateAdminInfo } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAdminInfo = (state) => state.auth.adminInfo;

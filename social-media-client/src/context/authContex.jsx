import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; // Corrected import

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null, // Load from localStorage
  user: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null,
  isAuthenticated: localStorage.getItem("token") ? true : false, // Check if there's a token
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.user = jwtDecode(token);

      // Store token in localStorage
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;

      // Remove token from localStorage
      localStorage.removeItem("token");
    },
    checkTokenValidity: (state) => {
      if (state.token) {
        const decoded = jwtDecode(state.token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          state.token = null;
          state.isAuthenticated = false;
          state.user = null;

          // Remove token from localStorage if expired
          localStorage.removeItem("token");
        }
      }
    },
  },
});

export const getUserId = (state) => {
  return state.user._id;
};

export const { login, logout, checkTokenValidity } = authSlice.actions;
export default authSlice.reducer;

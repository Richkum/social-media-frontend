import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      // Decode the token to get user data (assuming JWT token)
      state.user = jwtDecode(token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    checkTokenValidity: (state) => {
      if (state.token) {
        const decoded = jwtDecode(state.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          state.token = null;
          state.isAuthenticated = false;
          state.user = null;
        }
      }
    },
  },
});

export const { login, logout, checkTokenValidity } = authSlice.actions;
export default authSlice.reducer;

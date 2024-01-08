import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    account: {
      access_token: "",
      refresh_token: "",
      username: "",
      image: "",
      role: "",
      email: "",
    },
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.account = {
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        username: action.payload.username,
        image: action.payload.image,
        role: action.payload.role,
        email: action.payload.email,
      };
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.account = {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        role: "",
        email: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logOut } = userSlice.actions;

export default userSlice.reducer;

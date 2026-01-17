import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  backendUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.backendUser = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.backendUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;

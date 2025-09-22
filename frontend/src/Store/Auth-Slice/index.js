import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  backendUser: null,
};

// This thunk will now make a GET request to a protected route
// without passing any user ID from the frontend.
export const fetchCurrentUser = createAsyncThunk("/auth/currentUser", async () => {
  const response = await axios.get("/api/user/me");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.backendUser = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.backendUser = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.backendUser = null;
        state.isAuthenticated = false;
        console.error("Failed to fetch user:", action.error.message);
      });
  },
});

export default authSlice.reducer;
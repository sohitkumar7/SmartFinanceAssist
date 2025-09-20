import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ChartNoAxesColumnDecreasing } from "lucide-react";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  backendUser: null,
};

// export const loginUser = createAsyncThunk("/auth/login",

//     async (formData)=>{
//         const response = await axios.post("/api/user/login",formData)
//         return response.data;
//     }
// )

export const loginuser = createAsyncThunk(
  "auth/loginUser",
  async ({ clerkId, email, name, token }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ send Clerk token
        },
        body: JSON.stringify({ clerkId, email, name }),
      });

      const data = await res.json();
      console.log("loginSliceUSer ::: ", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.backendUser = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.backendUser = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.isLoading = false;
        state.backendUser = null;
        state.isAuthenticated = false;
      });
  },
});
export default authSlice.reducer;

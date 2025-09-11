import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    backendUser: null,
}

export const registerUser = createAsyncThunk("/auth/register",

    async (formData)=>{
        const response = await axios.post("/api/Users/register",formData)   
        return response.data;
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers :{},
    extraReducers:(builder) => {
        builder 
        .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.backendUser = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = true;
        state.backendUser = null;
        state.isAuthenticated = false;
      })

    }
})
export default authSlice.reducer;



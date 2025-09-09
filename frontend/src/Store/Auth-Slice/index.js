import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isAuthenticated: false,
    isLoading: true,
    backendUser: null,
}

export const registerUser = createAsyncThunk("/auth/register",

    async (formData)=>{
        const response = await axios.post("/api/register",formData)   
        return response.data;
    }
)

export const logoutUser = createAsyncThunk("/auth/register",

    async (formData)=>{
        const response = await axios.post("/api/logout",formData)   
        return response.data;
    }
)



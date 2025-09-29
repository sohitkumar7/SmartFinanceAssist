import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allAccount : []
}

export const createAccount = createAsyncThunk("/create/account" , async (formData) => {
    
    const response = await axios.post("/api/account/create",formData);
    return response.data;
})

export const fetchallAccount = createAsyncThunk("/get/allAccount" , async (userId) => {
    
    const response = await axios.get(`/api/account/get/${userId}`);
    return response.data;
})


const AccountSlice = createSlice({
    name: "Accountt",
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder
        .addCase(createAccount.pending,(state) =>{
            state.allAccount = []
        }).addCase(createAccount.rejecct,(state) =>{
           state.allAccount  = []
        }).addCase(createAccount.fulfilled,(state,action) =>{
            if(action.payload.success){
                state.allAccount = action.payload?.data?.accounts
            }
            else{
                state.allAccount = [];
            }
        })
        
        .addCase(fetchallAccount.pending,(state) =>{
            state.allAccount = []
        }).addCase(fetchallAccount.rejecct,(state) =>{
           state.allAccount  = []
        }).addCase(fetchallAccount.fulfilled,(state,action) =>{
            if(action.payload.success){
                state.allAccount = action.payload?.data?.accounts
            }
            else{
                state.allAccount = [];
            }
        })


    }
})
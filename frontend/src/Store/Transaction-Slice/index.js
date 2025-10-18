import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducer from "../Account-Slice";

const initialState = {
    allTransaction : [],
    isLoading : false,
    TotalTransaction : 0,
}

export const createTransaction = createAsyncThunk("/create/transaction",
    async(formData) => {
        const response = axios.post("/api/transaction/create",formData);
        return (await response).data;
    }
)

export const fetchAllTransaction = createAsyncThunk("/get/all/Transaction", 
    async({accountId})=>{
        const response = await axios.get(`/api/transaction/get/all/${accountId}`)
        console.log("response",response);
        return response.data;
    })


const transactionSlice = createSlice({

    name:"Transaction",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder

        .addCase(createTransaction.pending,(state) =>{
            state.isLoading = true;
        }).addCase(createTransaction.rejected,(state,action)=>{
            state.isLoading = false;
            state.allTransaction = [];
        }).addCase(createTransaction.fulfilled,(state,action) => {
            isLoading = false;
            allTransaction = action?.payload?.data?.data;
        })
        
        .addCase(fetchAllTransaction.pending,(state) =>{
            state.isLoading = true;
        }).addCase(fetchAllTransaction.rejected, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllTransaction.fulfilled, (state,action) =>{
            state.isLoading = false;
            console.log(action?.payload)
            state.TotalTransaction = action?.payload?.allTransction?.length;
            state.allTransaction = action?.payload?.allTransction; 
        })

    }
})

export default transactionSlice.reducer;
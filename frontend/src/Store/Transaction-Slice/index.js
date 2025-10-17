import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import reducer from "../Account-Slice";

const initialState = {
    allTransaction : [],
    isLoading : false,
}

export const createTransaction = createAsyncThunk("/create/transaction",
    async(formData) => {
        const response = axios.post("/api/transaction/create",formData);
        return (await response).data;
    }
)


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
            allTransaction = action?.payload?.data;
        })

    }
})

export default transactionSlice.reducer;
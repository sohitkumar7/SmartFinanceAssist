import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api.js";
import reducer from "../Account-Slice";

const initialState = {
  allTransaction: [],
  isLoading: false,
  TotalTransaction: 0,
  updatedBalance : 0,
};

export const createTransaction = createAsyncThunk(
  "/create/transaction",
  async (formData) => {
    const response = api.post("/api/transaction/create", formData);
    return (await response).data;
  }
);

export const fetchAllTransaction = createAsyncThunk(
  "/get/all/Transaction",
  async ({ accountId }) => {
    const response = await api.get(`/api/transaction/get/all/${accountId}`);
    // console.log("response",response);
    return response.data;
  }
);

export const DeletTransaction = createAsyncThunk("/delete/transaction" , async(formdata) => {

    console.log(formdata,"formdata")
    const response = await api.post("/api/transaction/delete/all",formdata);
    return response.data;

})


const transactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.allTransaction = [];
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTransaction = action?.payload?.data?.data;
        state.updatedBalance = action?.payload?.updatedBalance
      })

      .addCase(fetchAllTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTransaction.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action?.payload)
        state.TotalTransaction = action?.payload?.allTransction?.length;
        state.allTransaction = action?.payload?.allTransction;
        state.updatedBalance = action?.payload?.updatedBalance
      })

      .addCase(DeletTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeletTransaction.rejected, (state) => {
        state.isLoading = true;
      })
      .addCase(DeletTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.TotalTransaction = action?.payload?.allTransction?.length;
        state.allTransaction = action?.payload?.allTransction;
        
        console.log(action?.payload?.updatedBalance)
        state.updatedBalance = action?.payload?.updatedBalance
      })


  },
});

export default transactionSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  DashallTransaction: [],
  isLoading: false,
};

export const DashfetchAllTransaction = createAsyncThunk(
  "dashboard/getAllTransaction",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axios.get(`/api/data/getdata/${userId}`);
      return response.data; // expecting { success, data }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

const DashhtransactionSlice = createSlice({
  name: "DashTransaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(DashfetchAllTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DashfetchAllTransaction.rejected, (state) => {
        state.isLoading = false;
        state.DashallTransaction = [];
      })
      .addCase(DashfetchAllTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.DashallTransaction = action.payload?.data || [];
      });
  },
});

export default DashhtransactionSlice.reducer;

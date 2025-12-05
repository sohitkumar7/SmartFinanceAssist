import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  budgetAmount: 0,
  isLoading: true,
};

export const createBudget = createAsyncThunk(
  "/create/update/budget",
  async ({ formData }) => {
    const response = await axios.post("/api/Budget/Upsert", formData);
    return response.data;
  }
);

export const fetchBudget = createAsyncThunk("/Fetch/budget", async (AccountId) => {
  const response = await axios.get(`/api/Budget/fetchBudget/${AccountId}`);
  return response.data;
});

const BudgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action?.payload?.success) {
          state.budgetAmount = action?.payload?.data.amount;
        } else {
          state.budgetAmount = 0;
        }
      })
      .addCase(createBudget.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action?.payload?.success) {
          state.budgetAmount = action?.payload?.data.amount;
        } else {
          state.budgetAmount = 0;
        }
      })
      .addCase(fetchBudget.rejected, (state) => {
        state.isLoading = false;
      });

  },
});

export default BudgetSlice.reducer;
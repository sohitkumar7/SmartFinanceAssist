import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api.js";

const initialState = {
  budgetAmount: null,
  isLoading: true,
  currentMonthExpenses : 0,
  remaining : null
};

export const createBudget = createAsyncThunk(
  "/create/update/budget",
  async ({ AccountId, amount }, thunkAPI) => {
    try {
      const response = await api.post("/api/Budget/Upsert", { AccountId, amount });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const fetchBudget = createAsyncThunk("/Fetch/budget", async (AccountId) => {
  const response = await api.get(`/api/Budget/fetchBudget/${AccountId}`);
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
          state.budgetAmount = null;
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
          state.budgetAmount = action?.payload?.data?.budget?.amount;
          state.currentMonthExpenses = action?.payload?.data?.currentMonthExpenses;
          state.remaining = action?.payload?.data?.remaining;
        } else {
          state.budgetAmount = null;
        }
      })
      .addCase(fetchBudget.rejected, (state) => {
        state.isLoading = false;
      });

  },
});

export default BudgetSlice.reducer;
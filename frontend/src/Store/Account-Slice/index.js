import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api.js";

const initialState = {
  allAccount: [],
  isLoading: false,
  defaultAccount: null,
};

export const createAccount = createAsyncThunk(
  "/create/account",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/api/account/create", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const fetchallAccount = createAsyncThunk(
  "/get/allAccount",
  async (_, thunkAPI) => {
    try {
      const response = await api.get(`/api/account/get`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);
export const makeoneDefault = createAsyncThunk(
  "/change/iusDefault",
  async ({ accountId }) => {
    const response = await api.put(`/api/account/change/${accountId}`);
    return response.data;
  }
);

export const deleteAccount = createAsyncThunk(
  "/delete/account",
  async ({ accountId }, thunkAPI) => {
    try {
      const response = await api.delete(`/api/account/delete/${accountId}`);
      return { ...response.data, accountId }; // send id back to reducer
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);


const AccountSlice = createSlice({
  name: "Accountt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        if (action.payload.success) {
          console.log(action?.payload);
          state.allAccount.push(action.payload.accounts);
        }

        state.isLoading = false;
      })

      .addCase(fetchallAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchallAccount.rejected, (state) => {
        state.allAccount = [];
        state.isLoading = false;
      })
      .addCase(fetchallAccount.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.allAccount = action.payload?.accounts;
        } else {
          state.allAccount = [];
        }
        state.isLoading = false;
      })

      .addCase(makeoneDefault.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeoneDefault.rejected, (state) => {
        state.defaultAccount = {};
        state.isLoading = false;
      })
      .addCase(makeoneDefault.fulfilled, (state, action) => {
        if (action?.payload?.success) {
          state.defaultAccount = action.payload.updatedAccount;
        } else {
          state.defaultAccount = {};
        }

        state.isLoading = false;
      })
      
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.allAccount = state.allAccount.filter(
            (acc) => acc._id !== action.payload.accountId
          );
        }
        state.isLoading = false;
      })


  },
});

export default AccountSlice.reducer;

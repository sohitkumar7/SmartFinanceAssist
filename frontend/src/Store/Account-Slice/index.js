import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allAccount: [],
  isLoading: false,
  defaultAccount: null,
};

export const createAccount = createAsyncThunk(
  "/create/account",
  async (formData) => {
    const response = await axios.post("/api/account/create", formData);
    return response.data;
  }
);

export const fetchallAccount = createAsyncThunk(
  "/get/allAccount",
  async ({ UserId }) => {
    const response = await axios.get(`/api/account/get/${UserId}`);
    return response.data;
  }
);
export const makeoneDefault = createAsyncThunk(
  "/change/iusDefault",
  async ({ accountId }) => {
    const response = await axios.put(`/api/account/change/${accountId}`);
    return response.data;
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
      });
  },
});

export default AccountSlice.reducer;

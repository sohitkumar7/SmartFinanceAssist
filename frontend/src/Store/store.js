import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice/index.js"
import AccountSlice from "./Account-Slice/index.js";
import TransactionSlice from "./Transaction-Slice/index.js";
import BudgetSlice from "./Budget-Slice/index.js"
import DashtransactionSlice from "./Dashboarddataslice/index.js"

export const store = configureStore({
  reducer: {
    // add your reducers here
    auth:authReducer,
    Account:AccountSlice,
    Transaction : TransactionSlice,
    budget : BudgetSlice,
    dashData: DashtransactionSlice
  },
});

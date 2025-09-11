import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice/index.js"
export const store = configureStore({
  reducer: {
    // add your reducers here
    auth:authReducer,
  },
});

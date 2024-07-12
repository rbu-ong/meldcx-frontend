import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import devicesReducer from "./devices/devicesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    devices: devicesReducer,
  },
});

export default store;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDevices = createAsyncThunk(
  "devices/fetchDevices",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const response = await axios.get("http://35.201.2.209:8000/devices", {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      // Return only the devices array
      return response.data.devices;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    devices: [],
    status: "idle",
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        // Ensure action.payload is an array
        state.devices = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default devicesSlice.reducer;

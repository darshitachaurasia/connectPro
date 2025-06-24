import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/services";

export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchStats",
  async () => {
    return await service.getCounts();
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const response = await service.listAllUsers();
    return response.documents;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: null,
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default adminSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/services";

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId) => {
    const profile = await service.getUserProfile(userId);
    return profile;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

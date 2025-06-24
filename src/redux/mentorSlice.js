
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/services";

export const fetchMentors = createAsyncThunk("mentor/fetchAll", async () => {
  const response = await service.listMentors();
  return response.documents;
});

const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMentors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMentors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default mentorSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../appwrite/services";

export const fetchBookingsByUser = createAsyncThunk(
  "booking/fetchByUser",
  async (userId) => {
    const response = await service.listBookingsByUser(userId);
    return response.documents;
  }
);

export const createBooking = createAsyncThunk(
  "booking/create",
  async ({ userId, mentorId, serviceName, dateTime }) => {
    const slug = `${userId}_${mentorId}_${Date.now()}`;
    const booking = await service.createBooking({
      userId,
      mentorId,
      service: serviceName,
      dateTime,
      status: "pending",
      slug,
    });
    return booking;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookingsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchBookingsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default bookingSlice.reducer;
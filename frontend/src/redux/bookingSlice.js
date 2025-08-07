import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingApi from "../apiManager/booking"; // Your API functions

// Fetch bookings for the logged-in user
export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUser",
  async () => {
    const { data } = await bookingApi.getUserBookings();
    return data.bookings; // Expecting { bookings: [...] }
  }
);

// Fetch bookings for the logged-in mentor
export const fetchMentorBookings = createAsyncThunk(
  "booking/fetchMentor",
  async () => {
    const { data } = await bookingApi.getMentorBookings();
    return data.bookings;
  }
);

// Create a new booking
export const createBooking = createAsyncThunk(
  "booking/create",
  async (payload) => {
    const { data } = await bookingApi.createBooking(payload);
    return data.booking;
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [], // All bookings
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("booking") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("booking") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          if (action.type.includes("create")) {
            state.bookings.push(action.payload);
          } else {
            state.bookings = action.payload;
          }
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("booking") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default bookingSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "mock_bookings";

const saveBookingsToLocal = (bookings) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
};

const getBookingsFromLocal = () => {
  const bookings = localStorage.getItem(LOCAL_STORAGE_KEY);
  return bookings ? JSON.parse(bookings) : [];
};

export const fetchBookingsByUser = createAsyncThunk(
  "booking/fetchByUser",
  async (userId) => {
    const bookings = getBookingsFromLocal();
    return bookings.filter((b) => b.userId === userId);
  }
);

export const fetchBookingsByMentor = createAsyncThunk(
  "booking/fetchByMentor",
  async (mentorId) => {
    const bookings = getBookingsFromLocal();
    return bookings.filter((b) => b.mentorId === mentorId);
  }
);

export const createBooking = createAsyncThunk(
  "booking/create",
  async ({ userId, mentorId, serviceName, dateTime }) => {
    const slug = `${userId}_${mentorId}_${Date.now()}`;
    const newBooking = {
      id: slug,
      userId,
      mentorId,
      service: serviceName,
      dateTime,
      status: "pending",
      slug,
    };
    const current = getBookingsFromLocal();
    const updated = [...current, newBooking];
    saveBookingsToLocal(updated);
    return newBooking;
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
      .addCase(fetchBookingsByMentor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookingsByMentor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchBookingsByMentor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default bookingSlice.reducer;
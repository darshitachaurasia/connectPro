// redux/adminSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- THUNKS ---

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchStats",
  async () => {
    // Mocked or fetch from backend later
    return {
      totalUsers: 120,
      totalMentors: 18,
      totalBookings: 76,
      recentSignups: 8,
    };
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchUsers",
  async () => {
    // Replace with real DB call
    return [
      { $id: "user1", name: "Alice", email: "alice@example.com" },
      { $id: "user2", name: "Bob", email: "bob@example.com" },
    ];
  }
);

export const fetchAllMentors = createAsyncThunk(
  "admin/fetchMentors",
  async () => {
    return [
      { $id: "mentor1", name: "John", status: "pending" },
      { $id: "mentor2", name: "Sara", status: "approved" },
    ];
  }
);

export const updateMentorStatus = createAsyncThunk(
  "admin/updateMentorStatus",
  async ({ mentorId, status }) => {
    // Mocked update — update this to real logic/API later
    return { $id: mentorId, status, name: "Updated Mentor" };
  }
);

export const fetchAllBookings = createAsyncThunk(
  "admin/fetchBookings",
  async () => {
    return [
      {
        $id: "booking1",
        userId: "user1",
        mentorId: "mentor1",
        dateTime: "2025-06-26T14:30",
        serviceName: "Career Advice",
        status: "confirmed",
      },
    ];
  }
);

// --- INITIAL STATE ---

const initialState = {
  stats: null,
  users: [],
  mentors: [],
  bookings: [],
  status: "idle",
  error: null,
};

// --- SLICE ---

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // STATS
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      // USERS
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      // MENTORS
      .addCase(fetchAllMentors.fulfilled, (state, action) => {
        state.mentors = action.payload;
      })
      .addCase(updateMentorStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.mentors.findIndex((m) => m.$id === updated.$id);
        if (index !== -1) {
          state.mentors[index] = updated;
        }
      })

      // BOOKINGS
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
      });
  },
});

export default adminSlice.reducer;


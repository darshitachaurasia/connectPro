import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --- LocalStorage Helpers ---
const PROFILE_KEY = "mock_user_profile";

const saveProfileToLocal = (profile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

const getProfileFromLocal = () => {
  const profile = localStorage.getItem(PROFILE_KEY);
  return profile ? JSON.parse(profile) : null;
};

// --- Thunk: Fetch User Profile ---
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (userId, thunkAPI) => {
    // Simulate fetching based on ID
    const profile = getProfileFromLocal();

    if (!profile || profile.id !== userId) {
      return thunkAPI.rejectWithValue("User profile not found");
    }

    return profile;
  }
);

// --- Initial State ---
const initialState = {
  profile: getProfileFromLocal(),
  status: "idle",
  error: null,
};

// --- User Slice ---
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Optional: Update profile locally
    updateUserProfile: (state, action) => {
      state.profile = action.payload;
      saveProfileToLocal(action.payload);
    },
    clearUserProfile: (state) => {
      state.profile = null;
      localStorage.removeItem(PROFILE_KEY);
    },
  },
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
        state.error = action.payload;
      });
  },
});

export const { updateUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;

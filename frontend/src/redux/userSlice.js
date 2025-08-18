import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiManager/index";

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
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/profile`);
            saveProfileToLocal(response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.put(`/user/update`, userData);
            saveProfileToLocal(response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update profile");
        }
    }
);

export const rateMentor = createAsyncThunk(
    "user/rateMentor",
    async ({ mentorId, rating }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/rate-mentor/${mentorId}`, { rating });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to rate mentor");
        }
    }
);

export const updateProfilePicture = createAsyncThunk(
    "user/updateProfilePicture",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/update-profile-picture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            saveProfileToLocal(response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update profile picture");
        }
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
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(rateMentor.pending, (state) => {
                state.status = "loading";
            })
            .addCase(rateMentor.fulfilled, (state, action) => {
                state.status = "succeeded";
                // Optionally update local profile data if mentor details are part of it
            })
            .addCase(rateMentor.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProfilePicture.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProfilePicture.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload;
            })
            .addCase(updateProfilePicture.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { clearUserProfile } = userSlice.actions;
export default userSlice.reducer;

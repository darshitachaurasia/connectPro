import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setToken } from "../helper";


export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/api/auth/login",
            credentials,
            { withCredentials: true }
        );
        const data = response.data;
        // console.log(data);
        if (!data || data.success === false) {
            return thunkAPI.rejectWithValue(data?.message || "Login failed");
        }
        setToken(data.data.accessToken);
        return data.data?.user || data.data || null;
    } catch (error) {
        // console.log(error);
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Login failed");
        }
        return thunkAPI.rejectWithValue(error.message || "Network error");
    }
});

export const signUpUser = createAsyncThunk("auth/signup", async (formData, thunkAPI) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/api/auth/register",
            formData,
            { withCredentials: true }
        );
        const data = response.data;
        if (!data || data.success === false) {
            return thunkAPI.rejectWithValue(data?.message || "Signup failed");
        }
        return data.data || null;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Signup failed");
        }
        return thunkAPI.rejectWithValue(error.message || "Network error");
    }
});

import { getToken } from "../helper";

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {
    try {
        const token = getToken();
        const response = await axios.get(
            "http://localhost:4000/api/user/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );
        const data = response.data;
        if (!data || data.success === false) {
            return thunkAPI.rejectWithValue(data?.message || "Not authenticated");
        }
        return data.data || null;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Not authenticated");
        }
        return thunkAPI.rejectWithValue(error.message || "Network error");
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/api/auth/logout",
            {},
            { withCredentials: true }
        );
        const data = response.data;
        if (!data || data.success === false) {
            return thunkAPI.rejectWithValue(data?.message || "Logout failed");
        }
        return true;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Logout failed");
        }
        return thunkAPI.rejectWithValue(error.message || "Network error");
    }
});

export const sendOtp = createAsyncThunk("auth/sendOtp", async (email, thunkAPI) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/api/auth/send-otp",
            {},
            { withCredentials: true }
        );
        const data = response.data;
        if (!data || data.success === false) {
            return thunkAPI.rejectWithValue(data?.message || "Email verification failed");
        }
        return data.data || null;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Email verification failed");
        }
        return thunkAPI.rejectWithValue(error.message || "Network error");
        
    }
})

export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (otp, thunkAPI) => {
    try {
        const response = await axios.post(
            "http://localhost:4000/api/auth/verify-otp",
            { otp },
            { withCredentials: true }
        );
        const data = response.data;
        if (!data || data.success === false) {
            return thunkAPI.rejectWithValue(data?.message || "OTP verification failed");
        }
        return data.data || null;
    } catch (error) {
        if (error.response && error.response.data) {
            return thunkAPI.rejectWithValue(error.response.data.message || "OTP verification failed");
        }
        return thunkAPI.rejectWithValue(error.message || "Network error");
    }
});

// --- Initial State ---
const initialState = {
    user: null,
    status: "idle",
    error: null,
};

// --- Auth Slice ---
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(signUpUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(getCurrentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.user = null;
                state.status = "idle";
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.status = "idle";
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(sendOtp.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(verifyOtp.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;

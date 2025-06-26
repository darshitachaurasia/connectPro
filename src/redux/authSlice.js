import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Simulated "database" (in real apps, you'd fetch from server)
let mockUsers = [
  { email: 'darshita@example.com', password: '123456', name: 'Darshita' },
];

// Helper to simulate local auth session
const saveUserToLocal = (user) => {
  localStorage.setItem('mock_user', JSON.stringify(user));
};

const getUserFromLocal = () => {
  const user = localStorage.getItem('mock_user');
  return user ? JSON.parse(user) : null;
};

const removeUserFromLocal = () => {
  localStorage.removeItem('mock_user');
};

// --- Thunks for Auth Actions (Mocked) ---
export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  const user = mockUsers.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    return thunkAPI.rejectWithValue('Invalid email or password');
  }

  saveUserToLocal(user);
  return user;
});

export const signUpUser = createAsyncThunk('auth/signup', async (formData, thunkAPI) => {
  const existing = mockUsers.find((u) => u.email === formData.email);
  if (existing) {
    return thunkAPI.rejectWithValue('User already exists');
  }

  const newUser = {
    email: formData.email,
    password: formData.password,
    name: formData.name || formData.email.split('@')[0],
  };

  mockUsers.push(newUser);
  saveUserToLocal(newUser);
  return newUser;
});

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, thunkAPI) => {
  const user = getUserFromLocal();
  if (user) {
    return user;
  } else {
    return thunkAPI.rejectWithValue('No user logged in');
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  removeUserFromLocal();
  return true;
});

// --- Initial State ---
const initialState = {
  user: getUserFromLocal(),
  status: 'idle',
  error: null,
};

// --- Auth Slice ---
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
        state.status = 'idle';
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

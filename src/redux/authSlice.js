import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  loading: false,
  role: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.profile = action.payload;
      state.role = action.payload.role || 'user';
      state.loading = false;
    },
    logout: (state) => {
      state.profile = null;
      state.role = null;
      state.loading = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

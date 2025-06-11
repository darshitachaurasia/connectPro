
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    status: false,
    error: null,
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state, action) => {
            state.user = action.payload;
            state.status = true;
            state.error = null;
        },
        logout : (state) => {
            state.user = null;
            state.status = false;
            state.error = null;
        },
        getCurrentUser : (state,action) => {
            state.user = action.payload;
            state.status = true;
            state.error = action.payload;
        },
        authError: (state, action) => {
            state.error = action.payload;
            state.status = false;
          }

    }
})

export const {login, logout,getCurrentUser,authError} = authSlice.actions;

export default authSlice.reducer;
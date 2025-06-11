
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   user : [],
   mentor : [],
   stats : {},
   loading: false,
}

const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers : {
        fet: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout : (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})

export const {login, logout} = adminSlice.actions;

export default adminSlice.reducer;
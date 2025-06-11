
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    profile: null,
    loading : false,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        fetchUserProfile : (state,action) => {
            state.profile = action.payload;
            state.loading = false;
        },
        updateUserProfile : (state,action) => {
            state.profile = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload; 
        },

    }
})

export const {fetchUserProfile,updateUserProfile,setLoading} = userSlice.actions;

export default userSlice.reducer;

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
        fetchAllUsers: (state, action) => {
            state.user = action.payload;  
            state.loading = false;
        },
        fetchAllMentors : (state,action) => {
            state.mentor = action.payload; 
            state.loading = false
        },
        getPlatformStats: (state,action)=> { 
            state.stats = action.payload
            state.loading = false
        },
        deleteUser : (state,action) => {
            state.user = state.user.filter(user => user.id !== action.payload);
            state.loading = false;
        },
        approveMentor : (state,action) => {
            const mentorIndex = state.mentor.findIndex(mentor => mentor.id === action.payload.id);
            if (mentorIndex !== -1) {
                state.mentor[mentorIndex] = {...state.mentor[mentorIndex], ...action.payload};
            }
            state.loading = false;
        },
        setLoading : (state,action) => {
            state.loading = action.payload;
        }
    }
})

export const {fetchAllUsers,fetchAllMentors,getPlatformStats,deleteUser,approveMentor,setLoading} = adminSlice.actions;

export default adminSlice.reducer;
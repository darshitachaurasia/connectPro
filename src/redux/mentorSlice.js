
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
   mentors : [],
   selectedMentor: null,
   loading: false
}

const userSlice = createSlice({
    name : 'mentor',
    initialState,
    reducers : {
        fetchAllMentors : (state,action) => {
            state.mentors = action.payload;
            state.selectedMentor = null;
            state.loading = false;
        },
        fetchMentorById : (state,action) => {
            state.mentors = action.payload;
            state.selectedMentor = action.payload;
            state.loading = false;
        },
        updateMentorProfile: (state, action) => {
            state.mentors = action.payload;
            state.selectedMentor = action.payload;
            state.loading = false;
        },
        setAvailableSlots: (state, action) => {
            state.mentors = action.payload;
            state.selectedMentor = action.payload;
            state.loading = false; 
        },
        setLoading: (state, action) => {
            state.loading = action.payload; 
        },

    }
})

export const {fetchAllMentors,fetchMentorById,updateMentorProfile,setAvailableSlots,setLoading} = userSlice.actions;

export default userSlice.reducer;
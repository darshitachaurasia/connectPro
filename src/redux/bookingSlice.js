
import {createSlice} from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

const initialState = {
    bookings: [],
  currentBooking: null,
  loading: false,
}

const bookingSlice = createSlice({
    name : 'booking',
    initialState,
    reducers : {
        createBooking : (state, action) => {
            const newBooking = action.payload;
            state.bookings.push(newBooking);
            state.loading = false;
        },
        fetchUserBookings : (state) => {
            state.loading = true;
        },
        fetchMentorBookings : (state,action) => {
            state.bookings = action.payload;
            state.loading = false;
        },
        updateBookingStatus: (state, action) => {
            const { bookingId, status } = action.payload;
            const bookingIndex = state.bookings.findIndex(booking => booking.id === bookingId);
            if (bookingIndex !== -1) {
                state.bookings[bookingIndex].status = status;
            }
            state.loading = false;
        },
        acceptUserBooking: (state,action)=> {
            const { bookingId } = action.payload;
            const bookingIndex = state.bookings.findIndex(booking => booking.id === bookingId);
            if (bookingIndex !== -1) {
                state.bookings[bookingIndex].status = 'accepted';
            }
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

    }
})

export const {createBooking, fetchUserBookings, fetchMentorBookings, updateBookingStatus, setLoading} = bookingSlice.actions;

export default bookingSlice.reducer;
import api from "./index";

const bookingApi = {
  createBooking: (payload) => {
    return api.post("/bookings/create", payload);
  },

  getBookedSlots: (mentorId, date) => {
    return api.get(`/bookings/booked-slots/${mentorId}?date=${date}`);
  },

  getUserBookings: () => {
    return api.get("/bookings/user");
  },

  getMentorBookings: () => {
    return api.get("/bookings/mentor");
  },
};

export default bookingApi;

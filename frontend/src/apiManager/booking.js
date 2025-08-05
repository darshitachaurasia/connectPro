import AxiosInstances from ".";

const createBooking = async (data) => {
  return await AxiosInstances.post("/bookings", data); // POST
};

const getUserBookings = async () => {
  return await AxiosInstances.get("/bookings/user"); // GET
};

const getMentorBookings = async () => {
  return await AxiosInstances.get("/bookings/mentor"); // GET
};

export default { createBooking, getUserBookings, getMentorBookings };

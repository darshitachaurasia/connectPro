import AxiosInstances from ".";

const createBooking = async (data) => {
  return await AxiosInstances.post("/bookings", data); // POST
};

const getUserBookings = async () => {
  return await AxiosInstances.get("/bookings/user"); // GET
};

import { getToken } from "../helper";

const getMentorBookings = async () => {
  const token = getToken();
  return await AxiosInstances.get("/bookings/mentor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); // GET
};

export default { createBooking, getUserBookings, getMentorBookings };

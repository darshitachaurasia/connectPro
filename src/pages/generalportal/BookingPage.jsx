import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBooking } from "../../redux/bookingSlice";

export default function BookingPage({ userId, mentorId }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ serviceName: "", dateTime: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking({
      userId,
      mentorId,
      serviceName: formData.serviceName,
      dateTime: formData.dateTime,
    }));
    alert("Booking created!");
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <h2 className="text-xl mb-2">Book a Session</h2>
      <input
        type="text"
        placeholder="Service"
        className="border p-2 mb-2 w-full"
        value={formData.serviceName}
        onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
      />
      <input
        type="datetime-local"
        className="border p-2 mb-2 w-full"
        value={formData.dateTime}
        onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Book
      </button>
    </form>
  );
}

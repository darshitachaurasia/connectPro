import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMentors } from "../../redux/mentorSlice";

export default function MentorProfilePage() {
  const { mentorId } = useParams();
  const dispatch = useDispatch();

  const mentors = useSelector((state) => state.mentor.list);
  const status = useSelector((state) => state.mentor.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMentors());
    }
  }, [status, dispatch]);

  const mentor = mentors.find((m) => m.$id === mentorId);

  if (status === "loading" || !mentor) return <p>Loading mentor profile...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-3xl font-bold mb-4 text-center">Mentor Profile</h2>

      <div className="space-y-3">
        <p><strong>Name:</strong> {mentor.name}</p>
        <p><strong>Email:</strong> {mentor.email}</p>
        <p><strong>Bio:</strong> {mentor.bio}</p>
        <p><strong>Experience:</strong> {mentor.experience}</p>
        <p><strong>Services:</strong> {mentor.services?.join(", ")}</p>
        <p><strong>Available Slots:</strong> {mentor.availableSlots?.join(", ")}</p>
        <p><strong>Role:</strong> {mentor.role}</p>
      </div>
    </div>
  );
}

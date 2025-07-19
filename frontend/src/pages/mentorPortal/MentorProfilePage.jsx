import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchMentors, updateMentor } from "../../redux/mentorSlice";
import { motion } from "framer-motion";

export default function MentorProfilePage() {
  const { mentorId } = useParams();
  const dispatch = useDispatch();

  const mentors = useSelector((state) => state.mentor.list);
  const status = useSelector((state) => state.mentor.status);

  const mentor = mentors.find((m) => m.$id === mentorId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    experience: "",
    services: "",
    availableSlots: "",
  });

  useEffect(() => {
    if (status === "idle") dispatch(fetchMentors());
    if (mentor) {
      setFormData({
        name: mentor.name || "",
        email: mentor.email || "",
        bio: mentor.bio || "",
        experience: mentor.experience || "",
        services: mentor.services?.join(", ") || "",
        availableSlots: mentor.availableSlots?.join(", ") || "",
      });
    }
  }, [status, dispatch, mentor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedMentor = {
      $id: mentorId,
      ...formData,
      services: formData.services.split(",").map((s) => s.trim()),
      availableSlots: formData.availableSlots.split(",").map((s) => s.trim()),
    };

    dispatch(updateMentor(updatedMentor));
    alert("Profile updated!");
  };

  if (status === "loading" || !mentor)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c0822] text-white text-4xl font-semibold">
        Loading mentor profile...
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0c0822] to-[#2d0727] text-white py-12 px-6 flex justify-center">
      
      {/* Back Button */}
      <Link
        to="/mentor-login"
        className="absolute top-6 left-6 bg-[#2d0727] text-pink-400 border border-pink-500 px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white transition duration-300 shadow-md"
      >
        ← Back
      </Link>

      {/* Mentor Profile Form */}
      <motion.form
        onSubmit={handleUpdate}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1e0e2f] rounded-2xl shadow-2xl border border-white/10 max-w-3xl w-full p-10 space-y-6"
      >
        <h2 className="text-4xl font-extrabold text-center text-pink-300 mb-4">
          Update Your Mentor Profile
        </h2>

        {[
          { label: "👤 Name", name: "name" },
          { label: "📧 Email", name: "email" },
          { label: "🧠 Bio", name: "bio" },
          { label: "🎓 Experience", name: "experience" },
          {
            label: "🛠️ Services (comma-separated)",
            name: "services",
          },
          {
            label: "🕒 Available Slots (comma-separated)",
            name: "availableSlots",
          },
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-semibold text-pink-400 mb-1">
              {label}
            </label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#2d0727] border border-pink-400/20 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white"
              required
            />
          </div>
        ))}

        <div className="flex flex-col items-center gap-4">
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-pink-600 rounded-full hover:bg-pink-700 transition font-semibold shadow-lg w-full"
          >
            Save Changes
          </button>
        </div>
      </motion.form>
    </div>
  );
}

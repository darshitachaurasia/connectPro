import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import service from '../../appwrite/services'; // adjust path
import {
  fetchMentorById,
  updateMentorProfile,
  setLoading,
} from '../../redux/mentorSlice';

const MentorProfile = () => {
  const dispatch = useDispatch();
  const { selectedMentor, loading } = useSelector(state => state.mentor);
  const userId = useSelector(state => state.auth.profile?.userId);

  const [formData, setFormData] = useState({
    bio: '',
    experience: '',
    availableSlots: '',
    services: '',
  });

  useEffect(() => {
    const loadMentor = async () => {
      dispatch(setLoading(true));
      const res = await service.getMentorByProfile(userId);
      if (res) {
        dispatch(fetchMentorById(res));
        setFormData({
          bio: res.bio || '',
          experience: res.experience || '',
          availableSlots: res.availableSlots || '',
          services: res.services || '',
        });
      }
    };
    if (userId) loadMentor();
  }, [userId, dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(setLoading(true));
    const res = await service.updateMentorsProfile({
      userId: selectedMentor?.$id,
      updatedData: formData,
    });
    if (res) dispatch(updateMentorProfile(res));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mentor Profile</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-medium">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Available Slots</label>
            <input
              type="text"
              name="availableSlots"
              value={formData.availableSlots}
              onChange={handleChange}
              placeholder="e.g., Mon-Fri 5-7PM"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Services Offered</label>
            <input
              type="text"
              name="services"
              value={formData.services}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default MentorProfile;




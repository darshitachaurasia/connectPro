import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import service from '../../appwrite/services';
import { login } from '../../redux/authSlice';

function UserProfilePage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.profile);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    bio: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!auth?.$id) return;

      try {
        const profile = await service.getUserProfile(auth.$id);
        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          role: profile.role || 'user',
          bio: profile.bio || '',
        });
        setLoading(false);
      } catch (err) {
        console.log('Failed to fetch user profile:', err);
      }
    }

    fetchUserProfile();
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth?.$id) return;

    try {
      const updated = await service.updateUserProfile({
        userId: auth.$id,
        updatedData: formData,
      });if(updated)
      {
      dispatch(login({ ...auth, ...formData }));
      alert('Profile updated successfully!'

      );}
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <p className="p-4">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            value={formData.email}
            readOnly
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Role</label>
          <input
            type="text"
            name="role"
            className="w-full border px-3 py-2 rounded"
            value={formData.role}
            readOnly
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            className="w-full border px-3 py-2 rounded"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UserProfilePage;


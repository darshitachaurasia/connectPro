import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import service from '../../appwrite/services';

import { Input, Button } from '../../components'; // Adjust path if needed

function UserProfilePage() {
  const auth = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [updateMessage, setUpdateMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      if (!auth?.$id) return;

      try {
        const profile = await service.getUserProfile(auth.$id);
        reset({
          name: profile.name || '',
          email: profile.email || '',
          role: profile.role || 'user',
          bio: profile.bio || '',
        });
      } catch (err) {
        console.log('Failed to fetch user profile:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [auth, reset]);

  const onSubmit = async (data) => {
    setUpdateMessage('');
    try {
      const updated = await service.updateUserProfile({
        userId: auth.$id,
        updatedData: data,
      });

      if (updated) {
        setUpdateMessage('✅ Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateMessage('❌ Failed to update profile.');
    }
  };

  if (loading) return <p className="text-center p-4">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>
      {updateMessage && (
        <p className="text-center text-sm text-green-600 mb-4">
          {updateMessage}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Full Name:"
          placeholder="Enter your full name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

        <Input
          label="Email:"
          type="email"
          readOnly
          {...register('email')}
        />

        <Input
          label="Role:"
          readOnly
          {...register('role')}
        />

        <div>
          <label className="block font-medium mb-1">Bio:</label>
          <textarea
            {...register('bio')}
            rows={4}
            className="w-full border px-3 py-2 rounded"
            placeholder="Tell us something about yourself..."
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </div>
  );
}

export default UserProfilePage;

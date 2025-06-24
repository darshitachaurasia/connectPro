import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUserProfile } from "../../redux/userSlice";
import { getCurrentUser } from "../../redux/authSlice";
import { Input, Button } from "../../components";

export default function UserProfilePage() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const userProfile = useSelector((state) => state.user.profile);
  const userStatus = useSelector((state) => state.user.status);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    if (auth?.$id) {
      dispatch(fetchUserProfile(auth.$id));
    } else {
      dispatch(getCurrentUser());
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (userProfile) {
      reset({
        name: userProfile.name || "",
        email: userProfile.email || "",
        role: userProfile.role || "user",
        bio: userProfile.bio || "",
      });
    }
  }, [userProfile, reset]);

  const onSubmit = async (data) => {
    setUpdateMessage("✅ Profile update functionality should be implemented via userSlice.");
  };

  if (userStatus === "loading") return <p className="text-center p-4">Loading profile...</p>;

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
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

        <Input
          label="Email:"
          type="email"
          readOnly
          {...register("email")}
        />

        <Input
          label="Role:"
          readOnly
          {...register("role")}
        />

        <div>
          <label className="block font-medium mb-1">Bio:</label>
          <textarea
            {...register("bio")}
            rows={4}
            className="w-full border px-3 py-2 rounded"
            placeholder="Tell us something about yourself..."
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}

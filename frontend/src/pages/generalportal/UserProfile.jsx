import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUserProfile, updateUserProfile } from "../../redux/userSlice";
import { getCurrentUser, sendOtp } from "../../redux/authSlice";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userStatus = useSelector((state) => state.user.status);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [updateMessage, setUpdateMessage] = useState("");

    const handleVerifyEmail = () => {
        dispatch(sendOtp());
        navigate("/verify-email");
        setUpdateMessage("✅ Verification email sent. Please check your inbox.");
    };

    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser());
        }
    }, [dispatch]);

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchUserProfile(user._id));
        }
    }, [user?._id, dispatch]);

    useEffect(() => {
        if (user) {
            reset({
                fullname: user.fullname || "",
                email: user.email || "",
                role: user.role || "user",
                profilePicture: user.profilePicture || "",
                title: user.title || "",
                company: user.company || "",
                expertise: user.expertise?.join(", ") || "",
                experience: user.experience || "",
                services: user.services?.join(", ") || "",
                hourlyRate: user.hourlyRate || "",
                rating: user.rating || "",
                bio: user.bio || "",
                location: user.location || "",
                responseTime: user.responseTime || "",
                sessions: user.sessions || "",
                availability: user.availability || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                expertise: data.expertise.split(",").map((s) => s.trim()),
                services: data.services.split(",").map((s) => s.trim()),
            };

            await dispatch(updateUserProfile(payload)).unwrap();
            setUpdateMessage("✅ Profile updated successfully");
        } catch (error) {
            setUpdateMessage("❌ Failed to update profile");
        }
    };

    if (userStatus === "loading")
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0c0822] to-[#2d0727]">
                <div className="text-white text-xl font-semibold">Loading profile...</div>
            </div>
        );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-950 to-blue-700 px-4">
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md text-white rounded-2xl p-10 border border-white/20 shadow-2xl">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-5xl font-bold shadow-lg mb-2 overflow-hidden">
                        {user?.profilePicture ? (
                            <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            user?.fullname?.[0]?.toUpperCase() || "U"
                        )}
                    </div>
                    <h2 className="text-3xl font-extrabold mb-1 tracking-wide">
                        {user?.fullname || "User"}
                    </h2>
                    <span className="text-blue-300 text-lg font-medium">
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                    </span>
                </div>

                {updateMessage && (
                    <p className="text-center text-base text-green-400 mb-4">{updateMessage}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <InputField label="Full Name" name="fullname" register={register} errors={errors} />
                        <ReadOnlyField label="Email" name="email" value={user?.email} isVerified={user?.isEmailVerified} onVerify={handleVerifyEmail} />
                        <ReadOnlyField label="Role" name="role" value={user?.role} />
                        <InputField label="Profile Picture URL" name="profilePicture" register={register} errors={errors} />
                        
                        {/* Professional Details */}
                        <InputField label="Title" name="title" register={register} />
                        <InputField label="Company" name="company" register={register} />
                        <InputField label="Expertise (comma-separated)" name="expertise" register={register} />
                        <InputField label="Experience" name="experience" register={register} />
                        <InputField label="Services (comma-separated)" name="services" register={register} />
                        <InputField type="number" label="Hourly Rate" name="hourlyRate" register={register} />
                        <InputField type="number" label="Rating" name="rating" register={register} />

                        {/* Additional Info */}
                        <TextareaField label="Bio" name="bio" register={register} />
                        <InputField label="Location" name="location" register={register} />
                        <InputField label="Response Time" name="responseTime" register={register} />
                        <InputField type="number" label="Sessions" name="sessions" register={register} />
                        <InputField label="Availability" name="availability" register={register} />
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

/* Reusable Components */
const InputField = ({ label, name, type = "text", register, errors }) => (
    <div>
        <label className="block text-blue-300 font-semibold mb-1">{label}</label>
        <input
            type={type}
            className="w-full rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
            {...register(name)}
        />
        {errors?.[name] && <p className="text-blue-200 text-xs mt-1">{errors[name].message}</p>}
    </div>
);

const TextareaField = ({ label, name, register }) => (
    <div className="md:col-span-2">
        <label className="block text-blue-300 font-semibold mb-1">{label}</label>
        <textarea
            className="w-full rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none min-h-[80px]"
            rows={4}
            {...register(name)}
        />
    </div>
);

const ReadOnlyField = ({ label, name, value, isVerified, onVerify }) => (
    <div>
        <label className="block text-blue-300 font-semibold mb-1">{label}</label>
        <div className="flex items-center gap-2">
            <input
                className="w-full rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white focus:outline-none"
                value={value || ""}
                readOnly
            />
            {name === "email" && (
                <button
                    type="button"
                    onClick={onVerify}
                    disabled={isVerified}
                    className={`ml-2 px-3 py-1 rounded ${isVerified ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"} text-white text-xs font-semibold`}
                >
                    {isVerified ? "Verified" : "Verify"}
                </button>
            )}
        </div>
    </div>
);

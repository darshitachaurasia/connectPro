import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUserProfile, updateUserProfile, rateMentor, updateProfilePicture } from "../../redux/userSlice";
import { getCurrentUser, sendOtp } from "../../redux/authSlice";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { profile: userProfile, status: userStatus } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [updateMessage, setUpdateMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("profilePicture", selectedFile);
            try {
                await dispatch(updateProfilePicture(formData)).unwrap();
                setUpdateMessage("✅ Profile picture updated successfully");
                setSelectedFile(null);
            } catch (error) {
                setUpdateMessage("❌ Failed to update profile picture");
            }
        }
    };

    const handleVerifyEmail = () => {
        dispatch(sendOtp());
        navigate("/verify-email");
        setUpdateMessage("✅ Verification email sent. Please check your inbox.");
    };

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchUserProfile());
        } else {
            dispatch(getCurrentUser());
        }
    }, [user?._id, dispatch]);

    useEffect(() => {
        const profile = userProfile || user;
        if (profile) {
            reset({
                fullname: profile.fullname || "",
                email: profile.email || "",
                role: profile.role || "user",
                profilePicture: profile.profilePicture || "",
                title: profile.title || "",
                company: profile.company || "",
                expertise: profile.expertise?.join(", ") || "",
                experience: profile.experience || "",
                services: profile.services?.join(", ") || "",
                hourlyRate: profile.hourlyRate || "",
                rating: profile.rating || "",
                bio: profile.bio || "",
                location: profile.location || "",
                responseTime: profile.responseTime || "",
                sessions: profile.sessions || "",
                availability: profile.availability || "",
            });
        }
    }, [userProfile, user, reset]);

    const onSubmit = async (data) => {
        try {
            const payload = { ...data };
            if ((userProfile || user)?.role !== 'user') {
                payload.expertise = data.expertise.split(",").map((s) => s.trim());
                payload.services = data.services.split(",").map((s) => s.trim());
            }

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
                    <div className="relative w-28 h-28">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-5xl font-bold shadow-lg overflow-hidden">
                            {(userProfile || user)?.profilePicture ? (
                                <img src={(userProfile || user).profilePicture} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                            ) : (
                                (userProfile || user)?.fullname?.[0]?.toUpperCase() || "U"
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    </div>
                    {selectedFile && (
                        <div className="mt-4 flex items-center gap-2">
                            <p className="text-sm text-gray-300">{selectedFile.name}</p>
                            <Button onClick={handleImageUpload} className="text-xs">Upload</Button>
                        </div>
                    )}
                    <h2 className="text-3xl font-extrabold mt-4 mb-1 tracking-wide">
                        {(userProfile || user)?.fullname || "User"}
                    </h2>
                    <span className="text-blue-300 text-lg font-medium">
                        {((userProfile || user)?.role?.charAt(0).toUpperCase() + (userProfile || user)?.role?.slice(1))}
                    </span>
                </div>

                {updateMessage && (
                    <p className="text-center text-base text-green-400 mb-4">{updateMessage}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <InputField label="Full Name" name="fullname" register={register} errors={errors} />
                        <ReadOnlyField label="Email" name="email" value={(userProfile || user)?.email} isVerified={(userProfile || user)?.isEmailVerified} onVerify={handleVerifyEmail} />
                        <ReadOnlyField label="Role" name="role" value={(userProfile || user)?.role} />
                        
                        {/* Professional Details */}
                        {(userProfile || user)?.role !== 'user' && (
                            <>
                                <InputField label="Title" name="title" register={register} />
                                <InputField label="Company" name="company" register={register} />
                                <InputField label="Expertise (comma-separated)" name="expertise" register={register} />
                                <InputField label="Experience" name="experience" register={register} />
                                <InputField label="Services (comma-separated)" name="services" register={register} />
                                <InputField type="number" label="Hourly Rate" name="hourlyRate" register={register} />
                                {/* Additional Info */}
                                <TextareaField label="Bio" name="bio" register={register} />
                                <StarRating mentorId={(userProfile || user)?._id} />
                                <InputField label="Location" name="location" register={register} />
                                <InputField label="Response Time" name="responseTime" register={register} />
                                <InputField type="number" label="Sessions" name="sessions" register={register} />
                                <InputField label="Availability" name="availability" register={register} />
                            </>
                        )}
                    </div>

                    <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

const StarRating = ({ mentorId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const dispatch = useDispatch();

    const handleRating = (rate) => {
        setRating(rate);
        dispatch(rateMentor({ mentorId, rating: rate }));
    };

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        type="button"
                        key={starValue}
                        className={`text-3xl ${starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-500"}`}
                        onClick={() => handleRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

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

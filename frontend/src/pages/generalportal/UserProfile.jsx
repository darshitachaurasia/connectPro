import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUserProfile } from "../../redux/userSlice";
import { getCurrentUser, sendOtp } from "../../redux/authSlice";
import { Input, Button } from "../../components";
import { useNavigate } from "react-router-dom";

export default function UserProfilePage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const userStatus = useSelector((state) => state.user.status);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const [updateMessage, setUpdateMessage] = useState("");

    const handleVerifyEmail = () => {
        // here backend call to send otp
        dispatch(sendOtp());
        navigate("/verify-email");
        setUpdateMessage("✅ Verification email sent. Please check your inbox.");
    }

    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser());
        }
    }, [dispatch]); // ✅ Only runs once on mount

    useEffect(() => {
        if (user?.$id) {
            dispatch(fetchUserProfile(user.$id));
        }
    }, [user?.$id, dispatch]); // ✅ Only runs when user ID becomes available

    useEffect(() => {
        if (user) {
            reset({
                name: user.fullname || "",
                email: user.email || "",
                role: user.role || "user",
                bio: user.bio || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            // You'd usually dispatch an update action here
            setUpdateMessage("✅ Profile updating");

            // Simulate async update success (you can replace this with actual dispatch call)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // ✅ Step 2: Navigate to dashboard after success
            navigate("/user-login");
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
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md text-white rounded-2xl p-10 border border-white/20 shadow-2xl relative">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-5xl font-bold shadow-lg mb-2">
                        {user?.fullname ? user.fullname[0].toUpperCase() : "U"}
                    </div>
                    <h2 className="text-3xl font-extrabold mb-1 tracking-wide">
                        {user?.fullname || "User"}
                    </h2>
                    <span className="text-blue-300 text-lg font-medium">
                        {user?.role
                            ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                            : "User"}
                    </span>
                </div>
                {updateMessage && (
                    <p className="text-center text-base text-green-400 mb-4">{updateMessage}</p>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-blue-300 font-semibold mb-1">
                                Full Name
                            </label>
                            <input
                                className="w-full rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your full name"
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-blue-200 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-blue-300 font-semibold mb-1">Email</label>
                            <div className="flex items-center gap-2">
                                <input
                                    className="w-full rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                                    type="email"
                                    readOnly
                                    {...register("email")}
                                />
                                {/* Email verification UI */}
                                <button
                                    type="button"
                                    className="ml-2 px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold transition"
                                    onClick={handleVerifyEmail} // Implement this handler to trigger OTP
                                    disabled={user?.isEmailVerified}
                                    title={user?.isEmailVerified ? "Verified" : "Verify Email"}
                                >
                                    {user?.isEmailVerified ? (
                                        <span className="flex items-center gap-1">
                                            <span className="text-green-300">Verified</span>{" "}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 inline"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </span>
                                    ) : (
                                        "Verify"
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-blue-300 font-semibold mb-1">Role</label>
                            <input
                                className="w-full rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                                readOnly
                                {...register("role")}
                            />
                        </div>
                        <div>
                            <label className="block text-blue-300 font-semibold mb-1">Bio</label>
                            <textarea
                                className="w-full rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none min-h-[80px]"
                                rows={4}
                                placeholder="Tell us something about yourself..."
                                {...register("bio")}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { sendOtp, verifyOtp, getCurrentUser } from "../../redux/authSlice";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, status, error } = useSelector((state) => state.auth);
    const [successMsg, setSuccessMsg] = useState("");
    const [resendStatus, setResendStatus] = useState("idle");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setSuccessMsg("");
        try {
            await dispatch(verifyOtp(data.otp)).unwrap();
            // Fetch updated user info to reflect verified status
            await dispatch(getCurrentUser());
            setSuccessMsg("✅ Email verified successfully!");
            setTimeout(() => {
                navigate("/profile");
            }, 1200);
        } catch (err) {
            // error is handled by redux state
        }
    };

    const handleResend = async () => {
        setResendStatus("loading");
        setSuccessMsg("");
        try {
            await dispatch(sendOtp()).unwrap();
            setResendStatus("success");
            setSuccessMsg("OTP sent to your email.");
        } catch (err) {
            setResendStatus("failed");
        }
        setTimeout(() => setResendStatus("idle"), 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0c0822] to-[#2d0727] px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-md text-white rounded-2xl p-10 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-center mb-6">Verify Your Email</h2>
                <p className="text-center text-white/80 mb-6">
                    Please enter the 6-digit OTP sent to your email address.
                    <br />
                    <span className="text-pink-300 font-medium">{user?.email}</span>
                </p>
                {successMsg && <p className="text-center text-green-400 mb-4">{successMsg}</p>}
                {error && <p className="text-center text-red-400 mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-pink-300 font-semibold mb-1">OTP</label>
                        <input
                            className="w-full rounded-lg px-4 py-2 bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 text-center tracking-widest text-lg"
                            placeholder="Enter OTP"
                            maxLength={6}
                            {...register("otp", {
                                required: "OTP is required",
                                minLength: { value: 6, message: "OTP must be 6 digits" },
                                maxLength: { value: 6, message: "OTP must be 6 digits" },
                                pattern: { value: /^[0-9]{6}$/, message: "OTP must be 6 digits" },
                            })}
                        />
                        {errors.otp && (
                            <p className="text-pink-200 text-xs mt-1">{errors.otp.message}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || status === "loading"}

                    >
                        {isSubmitting || status === "loading" ? "Verifying..." : "Verify Email"}
                    </Button>
                </form>
                <div className="mt-6 flex flex-col items-center">
                    <button
                        className="text-pink-400 hover:underline text-sm disabled:opacity-60"
                        onClick={handleResend}
                        disabled={resendStatus === "loading"}
                    >
                        {resendStatus === "loading" ? "Resending..." : "Resend OTP"}
                    </button>
                </div>
            </div>
        </div>
    );
}

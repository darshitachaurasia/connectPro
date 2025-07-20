import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { signUpUser } from "../redux/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SignUp() {
    const { user, error, status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit, setValue, watch } = useForm();
    const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState("");

    useEffect(() => {
        if (error) {
            const subscription = watch(() => {
                if (error) {
                    dispatch({ type: "auth/clearError" });
                }
            });
            return () => subscription.unsubscribe();
        }
    }, [watch, error, dispatch]);

    const onSubmit = (data) => {
        dispatch(signUpUser(data)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                const role = res.payload?.role;
                if (role === "admin") navigate("/admin-login");
                else if (role === "mentor") navigate("/mentor-login");
                else if (role === "user") navigate("/user-login");
            } else if (res.meta.requestStatus === "rejected") {
                toast.error(res.payload || "Signup failed. Please try again.");
            }
        });
    };



    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-[#0c0822] to-[#2d0727]">
            <div className="mx-auto w-full max-w-lg bg-white/10 backdrop-blur-sm text-white rounded-xl p-10 border border-white/20 shadow-lg">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>

                <div style={{ minHeight: 28 }} className="mt-6 text-center flex items-center justify-center">
                    {error ? (
                        <p className="text-red-500 w-full">{error}</p>
                    ) : null}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                    <Input
                        label="Full Name:"
                        placeholder="Enter your full name"
                        {...register("fullname", {
                            required: "Name is required",
                        })}
                    />
                    <Input
                        label="Email:"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                    />
                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    <select
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md text-white"
                        onChange={(e) => {
                            const role = e.target.value;
                            setValue("role", role);
                            setSelectedRole(role);
                        }}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select your role
                        </option>
                        <option value="user">User</option>
                        <option value="mentor">Mentor</option>
                        <option value="admin">Admin</option>
                    </select>
                    <p className="mt-2 text-center text-base text-white/70">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-semibold text-pink-400 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    <Button type="submit" className="w-full" disabled={status === "loading"}>
                        {status === "loading" ? "Creating..." : "Create Account"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

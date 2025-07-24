import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { signUpUser } from "../redux/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SignUp() {
  const { user, error, status } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (error) {
      const subscription = watch(() => {
        if (error) dispatch({ type: "auth/clearError" });
      });
      return () => subscription.unsubscribe();
    }
  }, [watch, error, dispatch]);

  const onSubmit = data => {
    dispatch(signUpUser(data)).then(res => {
      if (res.meta.requestStatus === "fulfilled") {
        const role = res.payload?.role;
        navigate(role ? `/${role}-login` : "/");
      } else {
        toast.error(res.payload || "Signup failed. Please try again.");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-800 to-blue-950 px-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Logo width="120px" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-blue-900 mb-4">
          Sign up to create an account
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Your full name"
            {...register("fullname", { required: "Name is required" })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            {...register("password", { required: "Password is required" })}
          />
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => {
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

          <p className="text-center text-sm text-blue-700">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-900 hover:underline">
              Sign In
            </Link>
          </p>

          <Button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg transition"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

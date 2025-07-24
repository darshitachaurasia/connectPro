import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm();
  const { user, status, error } = useSelector((state) => state.auth);

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
    dispatch(loginUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const role = res.payload.role;
        if (role === "admin") navigate("/admin-login");
        else if (role === "mentor") navigate("/mentor-login");
        else if (role === "user") navigate("/user-login");
      }
    });
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin-login");
      else if (user.role === "mentor") navigate("/mentor-login");
      else navigate("/user-login");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-800 to-blue-900">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-blue-300 text-blue-900 shadow-lg">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <div style={{ minHeight: 28 }} className="mt-6 text-center flex items-center justify-center">
          {error ? (
            <p className="text-red-500 w-full">{error}</p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
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
          <p className="mt-2 text-center text-base text-blue-700">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

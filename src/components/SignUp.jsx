import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signUpUser } from '../redux/authSlice';
import { useEffect, useState } from 'react';

function SignUp() {
  const { user, error, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("");

  const onSubmit = (data) => {
  dispatch(signUpUser(data)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") {
      const role = res.payload.role; // this should come from the returned user
      if (role === "admin") navigate("/admin-login");
      else if (role === "mentor") navigate("/mentor-login");
      else if (role === "user") navigate("/user-login");
    }
  });
};


  // Navigate immediately on role selection
  useEffect(() => {
    if (selectedRole === "admin") navigate("/admin-login");
    else if (selectedRole === "mentor") navigate("/mentor-login");
    else if (selectedRole === "user") navigate("/user-login");
  }, [selectedRole, navigate]);

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", {
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

            {/* Role selection with instant redirect */}
            <select
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                const role = e.target.value;
                setValue("role", role); // also update react-hook-form
                setSelectedRole(role);
              }}
              defaultValue=""
            >
              <option value="" disabled>Select your role</option>
              <option value="user">User</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>

            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;








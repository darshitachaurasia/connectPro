
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { Button, Input, Logo } from './index';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signUpUser } from '../redux/authSlice';
import { useEffect } from 'react';
function SignUp() {
  const { user, error, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
      dispatch(signUpUser(data));
    };
useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin-login');
      else if (user.role === 'mentor') navigate('/mentor-login');
      else navigate('/user-login');
    }
  }, [user, navigate]);

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

            <select
              {...register("role", { required: "Role is required" })}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select your role</option>
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







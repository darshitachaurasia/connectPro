import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <button
      className="inline-block px-6 py-2 text-white bg-pink-500 rounded-full hover:bg-pink-600 transition duration-200"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

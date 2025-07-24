
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';


function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <button
      className="inline-block px-6 py-2 text-white bg-blue-500 rounded-full hover:bg-pink-600 transition duration-200"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

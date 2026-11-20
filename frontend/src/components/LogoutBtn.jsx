
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';


function LogoutBtn({ onLoggedOut }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser()).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        onLoggedOut?.();
        navigate("/login");
      }
    });
  };

  return (
    <Button danger block icon={<LogoutOutlined />} onClick={logoutHandler} className="!h-11 !rounded-xl">
      Log out
    </Button>
  );
}

export default LogoutBtn;

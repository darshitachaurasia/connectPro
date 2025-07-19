
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/authSlice";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);
    return (
        <div className="flex flex-wrap content-between min-h-screen bg-[#2d0727]">
            <div className="w-full block">
                <ToastContainer />
                <Header />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default App;

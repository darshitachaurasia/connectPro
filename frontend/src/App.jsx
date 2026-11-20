
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./redux/authSlice";
import { getToken } from "./helper";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (getToken()) {
            dispatch(getCurrentUser());
        }
    }, [dispatch]);
    return (
        <div className="app-shell flex min-h-screen flex-col">
            <div className="flex w-full flex-1 flex-col">
                <ToastContainer />
                <Header />
                <main className="app-main flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default App;

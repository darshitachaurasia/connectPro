import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ConfigProvider } from "antd";

import { Login, SignUp } from "./components/index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/user/home/LandingPage.jsx";
import UserProfile from "./pages/user/account/UserProfile.jsx";
import VerifyEmail from "./pages/user/account/VerifyEmail.jsx";
import ServicesPage from "./pages/user/mentorship/ServicesPage.jsx";

import UserSignUp from "./pages/user/account/UserSignUp.jsx";

import UserManagementPage from "./pages/admin/UserManagementPage.jsx";
import MentorManagement from "./pages/admin/MentorManagement.jsx";
import BookingDetails from "./pages/user/bookings/BookingDetails";
import TopMentors from "./components/mentorship/TopMentors.jsx";

import UserDashboard from "./pages/user/account/UserDashboard.jsx";
import MentorDashboard from "./pages/mentor/MentorDashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";


import BookingPage from "./pages/user/bookings/BookingPage.jsx";
import MentorDetails from "./pages/user/mentorship/MentorDetails.jsx";
import BookingManagement from "./pages/admin/BookingManagement.jsx";

import LearnHeader from "./pages/user/learning/Learn.jsx";
import EmailSender from "./pages/user/account/EmailSender.jsx";
import MentorServices from "./pages/mentor/MentorServices.jsx";
import MentorBookings from "./pages/mentor/MentorBookings.jsx";
import MentorsPage from "./pages/user/mentorship/MentorsList.jsx";
import CareerTestBanner from "./pages/user/career/CareerTestBanner.jsx";
import CareerChat from "./pages/user/career/AIChat.jsx";
import CareerCounsellingQuiz from "./pages/user/career/CareerQuiz.jsx";
import CareerPathAI from "./pages/user/career/AI-Suggestions.jsx";
import Counsellor from "./pages/user/career/Counsellor.jsx";
import MentorChat from "./components/communication/MentorChat.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <LandingPage /> },

            // Public Auth Routes
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/user-signup", element: <UserSignUp /> },

            // Mentor listing and services are open to all
            { path: "/mentors", element: <TopMentors /> },
            { path: "/service", element: <ServicesPage /> },

            // User Auth Routes
            {
                path: "/user-login",
                element: <UserDashboard />,
            },
            {
                path: "/profile",
                element: <UserProfile />,
            },
             {
                path: "/Learn",
                element: <LearnHeader />,
            },
            {
                path: "/verify-email",
                element: <VerifyEmail />,
            },
            {
                path: "/booking-details",
                element: <BookingDetails />,
            },
            {
                path: "/booking-page/:mentorId",
                element: <BookingPage />,
            },
            
            {
                path: "/mentor/:id",
                element: <MentorDetails />,
            },
             {
                path: "/mentor-page",
                element: <MentorsPage/>,
            },
             {
                path: "/quiz",
                element: <CareerCounsellingQuiz/>,
            },
             {
                path: "/ai",
                element: <Counsellor/>,
            },
              {
                path: "/path",
                element: <CareerPathAI/>,
            },
               {
                path: "/send-email",
                element: <EmailSender/>,
            },
           //    {
           //     path: "/chat/:receiverId/:receiverRole",

            //    element: <MentorChat/>,
           // },
            // Mentor Portal
            {
                path: "/mentor-login",
                element: <MentorDashboard />,
            },
             {
                path: "/mentor-services",
                element: <MentorServices/>,
            },
            {
                path: "/mentor-bookings",
                element : <MentorBookings/>
            },
         

            // Admin Portal
            {
                path: "/admin-login",
                element: <AdminDashboard />,
            },
            {
                path: "/booking-manage",
                element: <BookingManagement />,
            },
            {
                path: "/manage-users",
                element: <UserManagementPage />,
            },
            {
                path: "/manage-mentors",
                element: <MentorManagement />,
            },

            // Unauthorized
            {
                path: "/",
                element: <div className="text-center p-10">⛔ Unauthorized Access</div>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#2563eb",
                        colorInfo: "#2563eb",
                        colorSuccess: "#16a34a",
                        colorWarning: "#d97706",
                        colorError: "#dc2626",
                        colorText: "#0f172a",
                        colorTextSecondary: "#64748b",
                        colorBgLayout: "#f8fafc",
                        colorBorder: "#e2e8f0",
                        borderRadius: 12,
                        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        controlHeight: 40,
                    },
                    components: {
                        Card: {
                            borderRadiusLG: 20,
                            headerFontSize: 16,
                            headerFontSizeSM: 15,
                        },
                        Button: {
                            fontWeight: 600,
                        },
                    },
                }}
            >
                <RouterProvider router={router} />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);

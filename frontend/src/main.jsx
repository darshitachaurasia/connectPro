import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store.js";

import { Login, SignUp } from "./components/index.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LandingPage from "./pages/generalportal/LandingPage.jsx";
import UserProfile from "./pages/generalportal/UserProfile.jsx";
import VerifyEmail from "./pages/generalportal/VerifyEmail.jsx";
import ServicesPage from "./pages/generalportal/ServicesPage.jsx";

import UserSignUp from "./pages/generalportal/UserSignUp.jsx";

import UserManagementPage from "./pages/adminPortal/UserManagementPage.jsx";
import MentorManagement from "./pages/adminPortal/MentorManagement.jsx";
import BookingDetails from "./pages/generalportal/BookingDetails";
import TopMentors from "./components/TopMentors.jsx";

import UserDashboard from "./pages/generalportal/UserDashboard.jsx";
import MentorDashboard from "./pages/mentorPortal/MentorDashboard.jsx";
import AdminDashboard from "./pages/adminPortal/AdminDashboard.jsx";


import BookingPage from "./pages/generalportal/BookingPage.jsx";
import MentorDetails from "./pages/generalportal/MentorDetails.jsx";
import BookingManagement from "./pages/adminPortal/BookingManagement.jsx";

import LearnHeader from "./pages/generalportal/Learn.jsx";

import MentorServices from "./pages/mentorPortal/MentorServices.jsx";
import MentorBookings from "./pages/mentorPortal/MentorBookings.jsx";
import MentorsPage from "./pages/generalportal/MentorsList.jsx";
import CareerTestBanner from "./pages/generalportal/CareerTestBanner.jsx";
import CareerChat from "./pages/generalportal/AIChat.jsx";
import CareerCounsellingQuiz from "./pages/generalportal/CareerQuiz.jsx";
import CareerPathAI from "./pages/generalportal/AI-Suggestions.jsx";



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
                path: "/mentor-details",
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
                element: <CareerChat/>,
            },
              {
                path: "/path",
                element: <CareerPathAI/>,
            },
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
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

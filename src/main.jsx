import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store.js';

import { Login, SignUp } from './components/index.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './pages/generalportal/LandingPage.jsx';
import UserProfile from './pages/generalportal/UserProfile.jsx';
import ServicesPage from './pages/generalportal/ServicesPage.jsx';

import UserSignUp from './pages/generalportal/UserSignUp.jsx';

import MentorProfilePage from './pages/mentorPortal/MentorProfilePage.jsx';
import MentorBooking from './pages/mentorPortal/MentorBooking.jsx';


import UserManagementPage from './pages/adminPortal/UserManagementPage.jsx';
import MentorManagement from './pages/adminPortal/MentorManagement.jsx';
import BookingDetails from './pages/generalportal/BookingDetails'

import UserDashboard from './pages/generalportal/UserDashboard.jsx';
import MentorDashboard from './pages/mentorPortal/MentorDashboard.jsx';
import AdminDashboard from './pages/adminPortal/AdminDashboard.jsx';


import MentorList from './pages/generalportal/MentorList.jsx';
import BookingPage from './pages/generalportal/BookingPage.jsx';
import MentorDetails from './pages/generalportal/MentorDetails.jsx';
import BookingManagement from './pages/adminPortal/BookingManagement.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <LandingPage /> },

      // Public Auth Routes
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/user-signup', element: <UserSignUp /> },

      // Mentor listing and services are open to all
      { path: '/mentors', element: <MentorList /> },
      { path: '/service', element: <ServicesPage /> },

      // User Auth Routes
      {
        path: '/user-login',
        element: (
          
            <UserDashboard />
        
        ),
      },
      {
        path: '/profile',
        element: (
          
            <UserProfile />
          
        ),
      },
      {
        path: '/booking-details',
        element: (
         
            <BookingDetails />
         
        ),
      },
      {
        path: '/booking-page/:mentorId',
        element: (
         
            <BookingPage />
         
        ),
      },
       {
        path: '/mentor-details',
        element: (
          
            <MentorDetails />
       
        ),
      },

      // Mentor Portal
      {
        path: '/mentor-login',
        element: (
          
            <MentorDashboard />
         
        ),
      },
      {
        path: '/mentor-profile',
        element: (
          
            <MentorProfilePage />
        
        ),
      },
      {
        path: '/mentor-bookings',
        element: (
          
            <MentorBooking />
       
        ),
      },

      // Admin Portal
      {
        path: '/admin-login',
        element: (
          
            <AdminDashboard />
          
        ),
      },
      {
        path: '/booking-manage',
        element: (
          
            <BookingManagement />
          
        ),
      },
      {
        path: '/manage-users',
        element: (
          
            <UserManagementPage />
        
        ),
      },
      {
        path: '/manage-mentors',
        element: (
          
            <MentorManagement />
         
        ),
      },

      // Unauthorized
      {
        path: '/',
        element: <div className="text-center p-10">⛔ Unauthorized Access</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      
        <RouterProvider router={router} />
      
    </Provider>
  </React.StrictMode>
);


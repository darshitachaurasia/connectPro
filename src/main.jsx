import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store.js';

import { AuthLayout, Login, Signup } from './components/index.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BookingDetails from './pages/generalportal/BookingDetails.jsx';
import MentorListing from './pages/generalportal/MentorListing.jsx';
import UserProfile from './pages/generalportal/UserProfile.jsx';
import ServicesPage from './pages/generalportal/ServicesPage.jsx';
import UserLogin from './pages/generalportal/UserLogin.jsx';
import UserSignUp from './pages/generalportal/UserSignUp.jsx';
import MentorLogin from './pages/mentorPortal/MentorLogin.jsx';
import MentorProfilePage from './pages/mentorPortal/MentorProfilePage.jsx';
import BookingService from './pages/mentorPortal/BookingService.jsx';
import MentorBooking from './pages/mentorPortal/MentorBooking.jsx';
import AdminLogin from './pages/adminPortal/AdminLogin.jsx';
import AnalyticsPage from './pages/adminPortal/AnalyticsPage.jsx';
import UserManagementPage from './pages/adminPortal/UserManagementPage.jsx';
import MentorManagement from './pages/adminPortal/MentorManagement.jsx';
import LandingPage from './pages/generalportal/LandingPage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // General Portal
      { path: '/', element: <LandingPage /> },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/services',
        element: (
          <AuthLayout authentication={false}>
            <ServicesPage />
          </AuthLayout>
        ),
      },
      { path: '/profile', element: <UserProfile /> },
      { path: '/mentors', element: <MentorListing /> },
      { path: '/booking', element: <ServicesPage /> },
      { path: '/booking-details', element: <BookingDetails /> },
      { path: '/user-login', element: <UserLogin /> },
      { path: '/user-signup', element: <UserSignUp /> },
      

      // Mentor Portal
      { path: '/mentor-login', element: <MentorLogin /> },
      { path: '/mentor-profile', element: <MentorProfilePage /> },
      { path: '/mentor-services', element: <BookingService /> },
      { path: '/mentor-bookings', element: <MentorBooking /> },

      // Admin Portal
      { path: '/admin-login', element: <AdminLogin /> },
      { path: '/admin-analytics', element: <AnalyticsPage /> },
      { path: '/manage-users', element: <UserManagementPage /> },
      { path: '/manage-mentors', element: <MentorManagement /> },
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

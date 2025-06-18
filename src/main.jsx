import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store.js';

import { AuthLayout, Login, SignUp } from './components/index.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LandingPage from './pages/generalportal/LandingPage.jsx';
import UserProfile from './pages/generalportal/UserProfile.jsx';
import ServicesPage from './pages/generalportal/ServicesPage.jsx';
import BookingDetails from './pages/generalportal/BookingDetails.jsx';
import MentorListing from './pages/generalportal/MentorListing.jsx';
import UserLogin from './pages/generalportal/UserLogin.jsx';
import UserSignUp from './pages/generalportal/UserSignUp.jsx';

import MentorLogin from './pages/mentorPortal/MentorLogin.jsx';
import MentorProfilePage from './pages/mentorPortal/MentorProfilePage.jsx';

import MentorBooking from './pages/mentorPortal/MentorBooking.jsx';

import AdminLogin from './pages/adminPortal/AdminLogin.jsx';
import AnalyticsPage from './pages/adminPortal/AnalyticsPage.jsx';
import UserManagementPage from './pages/adminPortal/UserManagementPage.jsx';
import MentorManagement from './pages/adminPortal/MentorManagement.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';


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
            <SignUp />
          </AuthLayout>
        ),
      },
      { path: '/user-login', element: <UserLogin /> },
      { path: '/user-signup', element: <UserSignUp /> },

      // Open route
      { path: '/mentors', element: <MentorListing /> },
      { path: '/booking', element: <ServicesPage /> },

      // Protected User Routes
      {
        path: '/profile',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/booking-details',
        element: (
          <ProtectedRoute allowedRoles={['user']}>
            <BookingDetails />
          </ProtectedRoute>
        ),
      },

      // Mentor Portal
      { path: '/mentor-login', element: <MentorLogin /> },
      {
        path: '/mentor-profile',
        element: (
          <ProtectedRoute allowedRoles={['mentor']}>
            <MentorProfilePage />
          </ProtectedRoute>
        ),
      },
      
      {
        path: '/mentor-bookings',
        element: (
          <ProtectedRoute allowedRoles={['mentor']}>
            <MentorBooking />
          </ProtectedRoute>
        ),
      },

      // Admin Portal
      { path: '/admin-login', element: <AdminLogin /> },
      {
        path: '/admin-analytics',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AnalyticsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/manage-users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <UserManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/manage-mentors',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <MentorManagement />
          </ProtectedRoute>
        ),
      },

      // Optional fallback
      {
        path: '/unauthorized',
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

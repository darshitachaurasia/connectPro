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
import BookingDetails from './pages/generalportal/BookingDetails.jsx';
import MentorListing from './pages/generalportal/MentorList.jsx';
import UserSignUp from './pages/generalportal/UserSignUp.jsx';

import MentorProfilePage from './pages/mentorPortal/MentorProfilePage.jsx';
import MentorBooking from './pages/mentorPortal/MentorBooking.jsx';

import AnalyticsPage from './pages/adminPortal/AnalyticsPage.jsx';
import UserManagementPage from './pages/adminPortal/UserManagementPage.jsx';
import MentorManagement from './pages/adminPortal/MentorManagement.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import UserDashboard from './pages/generalportal/UserDashboard.jsx';
import MentorDashboard from './pages/mentorPortal/MentorDashboard.jsx';
import AdminDashboard from './pages/adminPortal/AdminDashboard.jsx';

import AuthLayout from './components/AuthLayout.jsx';
import MentorList from './pages/generalportal/MentorList.jsx';

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
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
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
      {
        path: '/mentor-login',
        element: (
          <ProtectedRoute allowedRoles={['mentor']}>
            <MentorDashboard />
          </ProtectedRoute>
        ),
      },
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
      {
        path: '/admin-login',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
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
      <AuthLayout>
        <RouterProvider router={router} />
      </AuthLayout>
    </Provider>
  </React.StrictMode>
);


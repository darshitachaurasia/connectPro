import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // 🧭 Add paths for each page
  const pages = {
    general: [  
      { name: 'User Login', path: '/user-login' },
      { name: 'User SignUp', path: '/user-signup' },
      { name: 'User Profile', path: '/profile' },
      { name: 'Mentors Listing', path: '/mentors' },,
      { name: 'Booking Functionality', path: '/booking' },
      { name: 'Booking Details', path: '/booking-details' },
    ],
    mentor: [
      { name: 'Login Page', path: '/mentor-login' },
      { name: 'Mentor Profile', path: '/mentor-profile' },
      { name: 'Services Page', path: '/mentor-services' },
      { name: 'Booking Details', path: '/mentor-bookings' },
    ],
    admin: [
      { name: 'Login Page', path: '/admin-login' },
      { name: 'Analytics Page', path: '/admin-analytics' },
      { name: 'User Management', path: '/manage-users' },
      { name: 'Mentor Management', path: '/manage-mentors' },
    ],
  };

  return (
    <div className="relative z-50">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 z-[60] bg-[#2d0727] p-2 rounded-md shadow-md"
      >
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M5 7h14M5 12h14M5 17h14" />
        </svg>
      </button>

      {/* Blurred Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-[4px] z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#2d0727] text-white p-6 transition-transform duration-300 shadow-lg z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboards</h2>

        {Object.entries(pages).map(([key, links]) => (
          <div key={key} className="mb-4">
            <button
              className="w-full flex items-center justify-between text-left font-semibold hover:text-[#ff00e6] transition"
              onClick={() => toggleSection(key)}
            >
              <span className="capitalize">{key} Portal</span>
              <svg
                className={`w-5 h-5 text-white transform transition-transform duration-300 ${
                  openSection === key ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {openSection === key && (
              <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-300">
                {links.map((page, idx) => (
                  <li key={idx}>
                    <Link
                      to={page.path}
                      onClick={() => setIsOpen(false)}
                      className="block hover:text-[#ff00e6] transition"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;

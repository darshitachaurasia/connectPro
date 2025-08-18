import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideBar() {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // 🧭 Add paths for each page
  const pages = {
    authentication: [
      ...(user
        ? []
        : [
            { name: 'SignUp', path: '/user-signup' },
            { name: 'Login', path: '/login' },
          ]),
      { name: 'User Profile', path: '/profile' },
      {
        name: 'Dashboard',
        path: user?.role === 'mentor' ? '/mentor-login' : '/user-login',
      },
    ],
    booking: [
     { name: 'Mentors List', path: '/mentors' },
     { name: 'Booking Details', path: '/booking-details' },
      
    ],
     services: [
       { name: 'Services', path: '/service' },
    ],
  };

  return (
    <div className="relative z-50">
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 z-[60] bg-blue-900 p-2 rounded-md shadow-md"
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
        className={`fixed top-0 right-0 h-full w-72 bg-blue-800 text-white p-6 transition-transform duration-300 shadow-lg z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-amber-100">User Dashboard</h2>

        {Object.entries(pages).map(([key, links]) => (
          <div key={key} className="mb-4">
            <button
              className="w-full flex items-center justify-between text-left font-semibold hover:text-blue-600 transition"
              onClick={() => toggleSection(key)}
            >
              <span className="capitalize">{key} </span>
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
                      className="block hover:text-blue-600 transition"
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

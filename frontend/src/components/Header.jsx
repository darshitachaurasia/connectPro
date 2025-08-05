import React from 'react';
import { Logo, LogoutBtn } from './index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from './SideBar';

function Header() {
  const authUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authUser },
    { name: 'SignUp', slug: '/signup', active: !authUser },
    { name: 'Services', slug: '/service', active: true },
    {name : 'Resources',slug :'/Learn', active :true},
  ];

  return (
    <header className="py-3 shadow-md bg-white text-blue-700">
      <nav className="flex items-center justify-between px-6">
        
        {/* ✅ Logo */}
        <div className="flex items-center">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>

        {/* ✅ Navigation Links */}
        <ul className="hidden md:flex items-center gap-4">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-4 py-2 font-medium rounded-full text-blue-700 border border-transparent hover:border-blue-700 hover:bg-blue-50 transition-all duration-200"
                  >
                    {item.name}
                  </button>
                  <SideBar />
                </li>
              )
          )}

          {/* ✅ Logout Button */}
          {authUser && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>

        {/* ✅ Sidebar (for small screens) */}
        <div className="mt-0">
          
        </div>
      </nav>
    </header>
  );
}

export default Header;

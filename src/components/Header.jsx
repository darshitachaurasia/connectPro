import React from 'react';
import { Logo, LogoutBtn } from './index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from './SideBar';

function Header() {
  const authUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authUser,
    },
    {
      name: 'SignUp',
      slug: '/signup',
      active: !authUser,
    },
    {
      name: 'Services',
      slug: '/service',
      active: true,
    },
  ];

  return (
    <header className="py-3 shadow bg-[#2d0727] text-white">
      <nav className="flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-2">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="px-6 py-2 duration-200 hover:bg-white hover:text-black rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}

          {/* Logout Button */}
          {authUser && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>

        {/* Sidebar (optional for small screens) */}
        <SideBar />
      </nav>
    </header>
  );
}

export default Header;

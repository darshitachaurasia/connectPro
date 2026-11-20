import { useState } from "react";
import { Avatar, Button, Drawer } from "antd";
import {
  AppstoreOutlined,
  BookOutlined,
  BulbOutlined,
  CalendarOutlined,
  DashboardOutlined,
  HomeOutlined,
  LoginOutlined,
  MenuOutlined,
  ReadOutlined,
  RobotOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

const publicLinks = [
  { name: "Home", path: "/", icon: HomeOutlined },
  { name: "Find a mentor", path: "/mentor-page", icon: TeamOutlined },
  { name: "Services", path: "/service", icon: AppstoreOutlined },
];

const discoveryLinks = [
  { name: "Career quiz", path: "/quiz", icon: BulbOutlined },
  { name: "AI skill assessment", path: "/path", icon: RobotOutlined },
  { name: "AI career counsellor", path: "/ai", icon: ReadOutlined },
  { name: "Learning resources", path: "/Learn", icon: BookOutlined },
];

function isActivePath(pathname, path) {
  return path === "/"
    ? pathname === path
    : pathname === path || pathname.startsWith(`${path}/`);
}

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const accountLinks = user
    ? user.role === "mentor"
      ? [
          { name: "My bookings", path: "/mentor-bookings", icon: CalendarOutlined },
          { name: "My services", path: "/mentor-services", icon: AppstoreOutlined },
          { name: "My profile", path: "/profile", icon: UserOutlined },
          { name: "Dashboard", path: "/mentor-login", icon: DashboardOutlined },
        ]
      : user.role === "admin"
        ? [
            { name: "Manage bookings", path: "/booking-manage", icon: CalendarOutlined },
            { name: "Manage mentors", path: "/manage-mentors", icon: TeamOutlined },
            { name: "Manage users", path: "/manage-users", icon: UserOutlined },
            { name: "Dashboard", path: "/admin-login", icon: DashboardOutlined },
          ]
        : [
            { name: "My bookings", path: "/booking-details", icon: CalendarOutlined },
            { name: "My profile", path: "/profile", icon: UserOutlined },
            { name: "Dashboard", path: "/user-login", icon: DashboardOutlined },
          ]
    : [
        { name: "Log in", path: "/login", icon: LoginOutlined },
        { name: "Create an account", path: "/signup", icon: UserAddOutlined },
      ];

  const groups = [
    { title: "Explore", links: publicLinks },
    { title: "Grow your career", links: discoveryLinks },
    { title: user ? "Your workspace" : "Your account", links: accountLinks },
  ];

  const initials = user?.fullname
    ?.split(/\s+/)
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <Button
        className="!flex !h-10 !w-10 !items-center !justify-center !rounded-xl"
        aria-label="Open account and navigation menu"
        aria-expanded={isOpen}
        icon={<MenuOutlined />}
        onClick={() => setIsOpen(true)}
      />
      <Drawer
        title={null}
        placement="right"
        width={360}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        styles={{ body: { padding: 0 }, header: { display: "none" } }}
      >
        <div className="flex h-full flex-col bg-white">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 px-6 pb-7 pt-8 text-white">
            <div className="pointer-events-none absolute -right-12 -top-20 h-52 w-52 rounded-full border-[28px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-16 left-1/3 h-36 w-36 rounded-full bg-cyan-300/20 blur-2xl" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                  ConnectPro
                </p>
                <h2 className="m-0 text-2xl font-bold tracking-tight text-white">
                  {user ? "Your space" : "Explore"}
                </h2>
                <p className="mb-0 mt-1 text-sm text-blue-100">
                  {user ? "Everything you need, in one place." : "Find your next step."}
                </p>
              </div>
              <Button
                type="text"
                aria-label="Close navigation menu"
                icon={<span className="text-xl leading-none">×</span>}
                onClick={() => setIsOpen(false)}
                className="!flex !h-9 !w-9 !items-center !justify-center !rounded-full !text-white hover:!bg-white/15"
              />
            </div>
            {user && (
              <div className="relative mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                <Avatar
                  size={46}
                  src={user.profilePicture}
                  className="!border !border-white/30 !bg-white !font-semibold !text-blue-700"
                  icon={!initials && <UserOutlined />}
                >
                  {initials}
                </Avatar>
                <div className="min-w-0">
                  <p className="mb-0 truncate font-semibold text-white">
                    {user.fullname || "Welcome back"}
                  </p>
                  <p className="mb-0 mt-0.5 text-xs capitalize text-blue-100">
                    {user.role || "Member"} account
                  </p>
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-5">
            {groups.map((group) => (
              <section key={group.title} className="mb-6 last:mb-0">
                <h3 className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.links.map(({ name, path, icon: Icon }) => {
                    const active = isActivePath(location.pathname, path);
                    return (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setIsOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium no-underline transition-all ${
                          active
                            ? "bg-blue-50 text-blue-700 shadow-sm"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-lg text-base transition-colors ${
                            active
                              ? "bg-white text-blue-600"
                              : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600"
                          }`}
                        >
                          <Icon />
                        </span>
                        <span className="flex-1">{name}</span>
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </nav>

          {user && (
            <div className="border-t border-slate-100 p-4">
              <LogoutBtn onLoggedOut={() => setIsOpen(false)} />
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default SideBar;

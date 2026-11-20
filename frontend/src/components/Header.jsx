import { Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import SideBar from "./SideBar";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Find a mentor", path: "/mentor-page" },
  { name: "Career quiz", path: "/quiz" },
  { name: "AI counsellor", path: "/ai" },
  { name: "Resources", path: "/Learn" },
];

function Header() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="app-header sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 text-slate-800 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="ConnectPro home" className="shrink-0">
          <Logo width="132px" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium no-underline transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Button type="text" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button type="primary" onClick={() => navigate("/signup")}>
                Get started
              </Button>
            </div>
          )}
          <SideBar />
        </div>
      </nav>
    </header>
  );
}

export default Header;

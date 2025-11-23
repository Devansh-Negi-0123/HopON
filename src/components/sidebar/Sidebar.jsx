import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import profileImage from "../../assets/image.png";
import DashboardFooter from "../footer/DashboardFooter";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();       // Clear user state
    navigate("/");  // Redirect to landing page
  };

  const menuItems = [
    { label: "Profile", Icon: IconUser, to: "/dashboard/profile" },
    { label: "Create Ride", Icon: IconPlus, to: "/dashboard/create-ride" },
    { label: "Search Ride", Icon: IconSearch, to: "/dashboard/search-ride" },
    { label: "Notifications", Icon: IconMessage, to: "/dashboard/notifications" },
    { label: "Logout", Icon: IconLogout, onClick: handleLogout },
  ];

  return (
    <div className="w-1/4">
      <aside
        className={`
          top-16 left-0 h-[calc(100vh-9.75rem)] bg-gray-100 border-r z-40
          transition-[width,transform] duration-300 ease-in-out overflow-hidden
          ${isSidebarOpen ? "w-full" : "w-0 md:w-full"}
        `}
        aria-label="Sidebar"
      >
        {/* Profile */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="flex items-center gap-4 px-4">
            <img
              src={user?.avatar || profileImage}
              alt="User avatar"
              className="rounded-full w-16 h-16 border border-gray-200 shadow-sm"
            />
            <div className="flex flex-col">
              <div className="font-semibold text-lg">{user?.username || "UserName"}</div>
              <div className="text-xs text-gray-500">
                {user?.createdAt
                  ? `User since ${new Date(user.createdAt).getFullYear()}`
                  : "User since 2022"}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <nav className="px-3 pb-6">
          <div className="flex flex-col items-stretch gap-3">
            {menuItems.map(({ label, Icon, to, onClick }) =>
              to ? (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-3 w-full py-2.5 px-3 rounded-lg bg-white border text-left font-medium shadow-sm hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 text-gray-700">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              ) : (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex items-center gap-3 w-full py-2.5 px-3 rounded-lg bg-white border text-left font-medium shadow-sm hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 text-gray-700">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="truncate">{label}</span>
                </button>
              )
            )}
          </div>
        </nav>
      </aside>
      <DashboardFooter />
    </div>
  );
}

// Icons
const IconUser = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconPlus = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSearch = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconMessage = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLogout = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19H6a2 2 0 01-2-2V7a2 2 0 012-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

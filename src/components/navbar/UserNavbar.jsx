import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import profileImage from "../../assets/image.png";

export default function UserNavbar() {
  const [isDropdownOn, setIsDropdownOn] = useState(false);
  const [isUserDropdownOn, setIsUserDropdownOn] = useState(false);
  const { logout } = useContext(AuthContext); // access logout
  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (isUserDropdownOn) setIsUserDropdownOn(false);
    setIsDropdownOn((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    if (isDropdownOn) setIsDropdownOn(false);
    setIsUserDropdownOn((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsUserDropdownOn(false); // close dropdown after navigation
  };

  const handleLogout = () => {
    logout();              // clear user state
    navigate("/");          // redirect to landing page
    setIsUserDropdownOn(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b h-16 flex justify-between items-center p-4 md:px-8 sm:px-6 px-4">
      <span>
        <Link to="/">
          <span className="font-bold text-2xl">HopON</span>
        </Link>
      </span>

      <span className="hidden md:flex gap-16 items-center">
        <Link to="/#home">Home</Link>
        <Link to="/#about">About</Link>
        <Link to="/#services">Services</Link>
        <Link to="/#contact">Contact Us</Link>
      </span>

      <span className="flex gap-4 items-center">
        {/* User dropdown */}
        <div className="relative flex items-center">
          <button onClick={toggleUserDropdown}>
            <img
              src={profileImage}
              alt="User avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
          <div
            className={`flex flex-col gap-2 pl-2 py-2 w-32 sm:w-48 rounded-lg border absolute 
                        top-full right-0 z-40 mt-2 shadow-lg transition-all duration-200 ease-in-out transform
                        bg-gray-100
                        ${isUserDropdownOn ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <button
              onClick={() => handleNavigate("/dashboard/profile")}
              className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200 text-left"
            >
              Profile
            </button>
            <button
              onClick={() => handleNavigate("/dashboard")}
              className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200 text-left"
            >
              Dashboard
            </button>
            <button
              onClick={() => handleNavigate("/dashboard/settings")}
              className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200 text-left"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="hover:bg-green-500 px-2 py-1 rounded transition-colors duration-200 text-left"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile hamburger dropdown */}
        <div className="relative">
          <button className="md:hidden font-bold text-2xl" onClick={toggleDropdown}>
            &#9776;
          </button>
          <div
            className={`md:hidden flex flex-col gap-2 pl-2 py-2 w-32 sm:w-48 rounded-lg border absolute
                        top-full right-0 z-60 mt-3 shadow-lg transition-all duration-200 ease-in-out transform
                        bg-gray-100
                        ${isDropdownOn ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <Link to="/#home" className="hover:bg-red-400 px-2 py-1 rounded transition-colors duration-200">
              Home
            </Link>
            <Link to="/#about" className="hover:bg-red-400 px-2 py-1 rounded transition-colors duration-200">
              About
            </Link>
            <Link to="/#services" className="hover:bg-red-400 px-2 py-1 rounded transition-colors duration-200">
              Services
            </Link>
            <Link to="/#contact" className="hover:bg-red-400 px-2 py-1 rounded transition-colors duration-200">
              Contact Us
            </Link>
          </div>
        </div>
      </span>
    </nav>
  );
}

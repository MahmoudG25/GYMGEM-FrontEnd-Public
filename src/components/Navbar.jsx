import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaGem, FaUserCircle } from "react-icons/fa";
import { ChevronDown, Menu, X } from "lucide-react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import UserDropdown from "./UserDropdown";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  const [showGG, setShowGG] = useState(true);

  // Dropdown states
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const { showToast } = useToast();

  const menuRef = useRef(null);
  const trainingRef = useRef(null);
  const userRef = useRef(null);

  const logout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('refresh');
    const access = localStorage.getItem('access');
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${access} `, refresh: token },
        }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      showToast("Logout successful!", { type: "success" });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Force logout on error just in case
      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      showToast("Logged out.", { type: "info" });
      navigate("/login");
    }
  };

  const getDashboardPath = () => {
    if (!user || !user.profiles || !user.current_profile) return "/role";

    const currentProfileId = user.current_profile;
    const activeProfile = user.profiles.find(p => p.id === currentProfileId);

    if (!activeProfile) return "/role";

    const type = activeProfile.type.toLowerCase();
    switch (type) {
      case 'trainer': return '/trainer/dashboard';
      case 'trainee': return '/trainee/dashboard';
      case 'gym': return '/gym/dashboard';
      case 'store': return '/store/dashboard';
      default: return '/role';
    }
  };

  const isTrainer = () => {
    if (!user || !user.profiles || !user.current_profile) return false;
    const currentProfileId = user.current_profile;
    const activeProfile = user.profiles.find(p => p.id === currentProfileId);
    return activeProfile?.type.toLowerCase() === 'trainer';
  };

  // Logo Animation Effect
  useEffect(() => {
    let interval;
    const runAnimation = () => {
      setTimeout(() => {
        setShowGG(false);
        setShowFullName(true);

        setTimeout(() => {
          setShowFullName(false);

          setTimeout(() => {
            setShowGG(true);
          }, 1500);
        }, 5000);
      }, 8000);
    };

    runAnimation();
    interval = setInterval(runAnimation, 14500);
    return () => clearInterval(interval);
  }, []);

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (trainingRef.current && !trainingRef.current.contains(e.target)) {
        setTrainingOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Styles for Desktop Links
  const navLinkClasses = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 
    ${isActive ? "text-[#ff8211]" : "text-gray-700 hover:text-[#ff8211]"}
    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 
    after:h-[2px] after:bg-[#ff8211] after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  // Styles for Mobile Links
  const mobileLinkClasses = ({ isActive }) =>
    `block px-4 py-2 text-base font-medium transition-colors duration-200 rounded-md 
    ${isActive ? "bg-[#ff8211]/10 text-[#ff8211]" : "text-gray-700 hover:bg-gray-100 hover:text-[#ff8211]"}`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-wide transition hover:opacity-90"
        >
          <FaGem
            className={`text-[#86ac55] transition-transform duration-500 ${showFullName ? "scale-105" : "scale-100"
              }`}
          />
          <span className="relative h-6 w-24 overflow-hidden">
            <span
              className={`absolute inset-0 font-bebas text-2xl text-[#ff8211] transition-all duration-500 ${showGG ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
            >
              GG
            </span>
            <span className="absolute inset-0 flex items-center text-[#ff8211] font-bebas text-2xl tracking-tight">
              {"GYMGEM".split("").map((char, index, arr) => {
                const delay = showFullName
                  ? index * 0.1
                  : (arr.length - index - 1) * 0.1;
                return (
                  <span
                    key={char + index}
                    style={{ transitionDelay: `${delay}s` }}
                    className={`transition-all duration-300 ${showFullName
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                      }`}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <NavLink to="/" end className={navLinkClasses}>
            Home
          </NavLink>

          {/* Training Dropdown - Hidden for Trainers */}
          {!isTrainer() && (
            <div className="relative" ref={trainingRef}>
              <button
                onClick={() => setTrainingOpen(!trainingOpen)}
                className={`group flex items-center gap-1 text-sm font-medium transition-colors duration-200 
                  ${trainingOpen ? "text-[#ff8211]" : "text-gray-700 hover:text-[#ff8211]"}`}
              >
                Training
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${trainingOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {trainingOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 rounded-md border border-gray-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-200">
                  <NavLink
                    to="/courses"
                    onClick={() => setTrainingOpen(false)}
                    className="block rounded-sm px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#ff8211]"
                  >
                    Courses
                  </NavLink>
                  <NavLink
                    to="/trainers"
                    onClick={() => setTrainingOpen(false)}
                    className="block rounded-sm px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#ff8211]"
                  >
                    Trainers
                  </NavLink>
                  <NavLink
                    to="/trainees"
                    onClick={() => setTrainingOpen(false)}
                    className="block rounded-sm px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#ff8211]"
                  >
                    Trainees
                  </NavLink>
                </div>
              )}
            </div>
          )}

          <NavLink to="/stores" className={navLinkClasses}>
            Store
          </NavLink>

          <NavLink to="/gym" className={navLinkClasses}>
            Gym
          </NavLink>

          <NavLink to="/about" className={navLinkClasses}>
            About
          </NavLink>
        </div>

        {/* User Section (Desktop) */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {user ? (
            <UserDropdown
              user={user}
              logout={logout}
              dashboardPath={getDashboardPath()}
              settingsPath="/settings"
            />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#ff8211]"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-[#ff8211] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#ff8211]/90"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ff8211]"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="space-y-1 px-4 py-3">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>
              Home
            </NavLink>

            {/* Mobile Training Dropdown - Hidden for Trainers */}
            {!isTrainer() && (
              <div className="space-y-1">
                <button
                  onClick={() => setTrainingOpen(!trainingOpen)}
                  className="flex w-full items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[#ff8211] rounded-md"
                >
                  Training
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${trainingOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {trainingOpen && (
                  <div className="pl-4 space-y-1 border-l-2 border-gray-200 ml-4">
                    <NavLink
                      to="/courses"
                      onClick={() => setIsOpen(false)}
                      className={mobileLinkClasses}
                    >
                      Courses
                    </NavLink>
                    <NavLink
                      to="/trainers"
                      onClick={() => setIsOpen(false)}
                      className={mobileLinkClasses}
                    >
                      Trainers
                    </NavLink>
                    <NavLink
                      to="/trainees"
                      onClick={() => setIsOpen(false)}
                      className={mobileLinkClasses}
                    >
                      Trainees
                    </NavLink>
                  </div>
                )}
              </div>
            )}

            <NavLink to="/stores" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>
              Store
            </NavLink>
            <NavLink to="/gym" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>
              Gym
            </NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>
              About
            </NavLink>
          </div>

          {/* Mobile User Section */}
          <div className="border-t border-gray-200 px-4 pt-4 pb-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center px-2">
                  <div className="flex-shrink-0">
                    <FaUserCircle className="h-8 w-8 text-[#ff8211]" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-900">{user.username}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <NavLink
                    to={getDashboardPath()}
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClasses}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClasses}
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    to="/role"
                    onClick={() => setIsOpen(false)}
                    className={mobileLinkClasses}
                  >
                    Change Profile
                  </NavLink>
                  <button
                    onClick={(e) => {
                      setIsOpen(false);
                      logout(e);
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 px-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-md bg-[#ff8211] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#ff8211]/90"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

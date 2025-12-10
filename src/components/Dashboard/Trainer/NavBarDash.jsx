import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaGem, FaUserCircle } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../../../context/ToastContext";
import axiosInstance from "../../../utils/axiosConfig";
import UserDropdown from "../../UserDropdown";

const NavBarDash = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const links = [
    { to: "/", label: "Home" },
    { to: "/trainer/profile", label: "Profile" },
    { to: "/trainer", label: "Dashboard" },
    { to: "/trainer/courses", label: "Courses" },
    { to: "/trainer/clients", label: "Clients" },
  ];

  const [showFullName, setShowFullName] = useState(false);
  const [showGG, setShowGG] = useState(true);

  // Logout function
  const logout = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('refresh');
    try {
      // Using axiosInstance - automatic token handling!
      await axiosInstance.post(
        "/api/auth/logout",
        {},
        {
          headers: { refresh: token },
        }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      showToast("Logout successful!", { type: "success" });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      showToast("Logged out", { type: "info" });
      navigate("/login");
    }
  };

  // Click outside handler for user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userMenuOpen]);

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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed w-full top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-wide transition hover:opacity-80"
            >
              <FaGem
                className={`text-[#86ac55] transition-transform duration-500 ${showFullName ? "scale-110" : "scale-100"
                  }`}
              />
              <span className="relative h-6 w-32 overflow-hidden">
                <span
                  className={`absolute inset-0 font-bebas text-2xl transition-all text-[#ff8211] duration-500 ${showGG
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0"
                    }`}
                >
                  GG
                </span>
                <span className="absolute inset-0 flex items-center font-bebas text-2xl text-[#ff8211] tracking-tight">
                  {"GYMGEM".split("").map((char, index, arr) => {
                    const delay = showFullName
                      ? index * 0.05
                      : (arr.length - index - 1) * 0.05;
                    return (
                      <span
                        key={char + index}
                        style={{ transitionDelay: `${delay}s` }}
                        className={`transition-all duration-300 ${showFullName
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                          }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              </span>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-1 bg-slate-50/50 px-2 py-1 rounded-full border border-slate-100">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end
                    className={({ isActive }) =>
                      `relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${isActive ? "text-[#ff8211]" : "text-slate-600 hover:text-[#ff8211]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="navbar-active"
                            className="absolute inset-0 bg-orange-50 rounded-full -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        {l.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <NavLink
                  to="/notifications"
                  className="text-xl text-slate-500 hover:text-[#ff8211] transition-colors p-2 rounded-full hover:bg-slate-50 block"
                  aria-label="Notifications"
                >
                  <MdOutlineNotificationsActive />
                </NavLink>
              </motion.div>

              {/* User Dropdown Menu */}
              <UserDropdown
                user={user}
                logout={logout}
                dashboardPath="/trainer"
                settingsPath="/trainer/settings"
              />

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                onClick={() => setOpen((s) => !s)}
                aria-label="Toggle menu"
              >
                {open ? (
                  <HiOutlineX className="h-5 w-5" />
                ) : (
                  <HiOutlineMenu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white border-t border-slate-100"
            >
              <div className="px-4 py-4 space-y-2">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
                        ? "bg-orange-50 text-[#ff8211] shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default NavBarDash;

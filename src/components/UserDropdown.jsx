import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaDumbbell,
  FaStore,
  FaBuilding,
  FaUserGraduate,
  FaUserTie
} from "react-icons/fa";
import {
  ChevronDown,
  LayoutDashboard,
  Settings,
  UserPlus,
  LogOut,
  ChevronLeft,
  Check
} from "lucide-react";
import { getCreatedProfileTypes } from "../utils/auth";
import axiosInstance from "../utils/axiosConfig";

const UserDropdown = ({
  user,
  logout,
  dashboardPath = "/dashboard",
  settingsPath = "/settings"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuView, setMenuView] = useState("main"); // 'main' | 'profiles'
  const [menuHeight, setMenuHeight] = useState(null);
  const [createdProfiles, setCreatedProfiles] = useState([]);
  const [isLoadingProfileSwitch, setIsLoadingProfileSwitch] = useState(false);
  const dropdownRef = useRef(null);
  const mainViewRef = useRef(null);
  const profilesViewRef = useRef(null);
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState(JSON.parse(localStorage.getItem('user')).current_profile)



  const switchProfile = async (profile_id) => {
    setIsLoadingProfileSwitch(true);
    try {
      // ✅ Using axiosInstance - automatic 401 handling and token refresh!
      const response = await axiosInstance.post(
        '/api/auth/switch-profile',
        { profile_id }
      );

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      const updatedUser = {
        ...user,
        current_profile: profile_id
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log(`Switched to profile (ID: ${profile_id})`);
      setCurrentProfile(profile_id)
      setIsLoadingProfileSwitch(false);

    } catch (error) {
      console.log("Failed to change profile")
      setIsLoadingProfileSwitch(false);
    }
  }

  // Calculate height based on active view
  useEffect(() => {
    if (menuView === 'main' && mainViewRef.current) {
      setMenuHeight(mainViewRef.current.offsetHeight);
    } else if (menuView === 'profiles' && profilesViewRef.current) {
      setMenuHeight(profilesViewRef.current.offsetHeight);
    }
  }, [menuView, isOpen]);

  // Load createdProfiles from localStorage
  useEffect(() => {
    // Use the utility function to get profile types
    const profileTypes = getCreatedProfileTypes();
    setCreatedProfiles(profileTypes);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setMenuView("main"); // Reset view on close
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) setTimeout(() => setMenuView("main"), 200); // Reset after animation
  };

  const handleProfileSwitch = async (path, profileType) => {
    // Find the profile ID for the selected profile type
    if (profileType && user?.profiles) {
      const selectedProfile = user.profiles.find(
        p => p.type.toLowerCase() === profileType.toLowerCase()
      );

      if (selectedProfile) {
        // Update the user object with the new current_profile ID
        await switchProfile(selectedProfile.id);

        // Navigate to dashboard and reload to ensure fresh user data
        window.location.href = '/';
        return;
      } else {
        console.warn(`Profile type ${profileType} not found in user's profiles`);
      }
    }

    setIsOpen(false);
    navigate(path);
  };

  const profiles = [
    {
      type: "Trainee",
      path: "/trainee",
      icon: FaUserGraduate,
      colorClass: "bg-blue-100 text-blue-600"
    },
    {
      type: "Trainer",
      path: "/trainer",
      icon: FaUserTie,
      colorClass: "bg-purple-100 text-purple-600"
    },
    {
      type: "Gym",
      path: "/gym",
      icon: FaBuilding,
      colorClass: "bg-orange-100 text-orange-600"
    },
    {
      type: "Store",
      path: "/store",
      icon: FaStore,
      colorClass: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        disabled={isLoadingProfileSwitch}
        className={`flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium transition-colors ${isLoadingProfileSwitch
          ? "opacity-60 cursor-not-allowed"
          : "hover:bg-slate-50"
          } focus:outline-none focus:ring-2 focus:ring-[#ff8211]/20`}
      >
        <FaUserCircle className="text-lg text-[#ff8211]" />
        <span className="max-w-[100px] truncate hidden sm:inline">
          {user?.username || "User"}
        </span>
        {isLoadingProfileSwitch ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-[#ff8211]" />
        ) : (
          <ChevronDown
            className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg animate-in fade-in zoom-in-95 duration-200 z-50 transition-[height] ease-in-out ${isLoadingProfileSwitch ? "opacity-60 pointer-events-none" : ""
            }`}
          style={{ height: menuHeight ? `${menuHeight}px` : 'auto' }}
        >

          {/* Container for sliding views */}
          <div
            className="flex items-start transition-transform duration-300 ease-in-out"
            style={{ transform: menuView === 'profiles' ? 'translateX(-100%)' : 'translateX(0)' }}
          >

            {/* MAIN VIEW */}
            <div className="w-64 flex-shrink-0" ref={mainViewRef}>
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {user?.username || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <div className="p-1">
                <Link
                  to={dashboardPath}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#ff8211] transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to={settingsPath}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#ff8211] transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>

                <button
                  onClick={() => setMenuView("profiles")}
                  className="w-full flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-[#ff8211] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Change Profile
                  </div>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-slate-400 group-hover:text-[#ff8211]" />
                </button>
              </div>

              <div className="border-t border-slate-100 p-1">
                <button
                  onClick={(e) => {
                    setIsOpen(false);
                    logout(e);
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* PROFILES VIEW */}
            <div className="w-64 flex-shrink-0 bg-slate-50/30 relative" ref={profilesViewRef}>
              {isLoadingProfileSwitch && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-[#ff8211]" />
                    <span className="text-xs text-slate-600 font-medium">Switching...</span>
                  </div>
                </div>
              )}
              <div className="px-2 py-2 border-b border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setMenuView("main")}
                  disabled={isLoadingProfileSwitch}
                  className={`p-1 rounded-full text-slate-500 transition-colors ${isLoadingProfileSwitch ? "cursor-not-allowed opacity-50" : "hover:bg-slate-200"
                    }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-slate-900">Switch Profile</span>
              </div>

              <div className="p-1 space-y-0.5">
                {profiles.map((profile) => {
                  const isEnabled = createdProfiles.includes(profile.type) && !isLoadingProfileSwitch;
                  const Icon = profile.icon;

                  // Check if this is the currently active profile
                  const isCurrentProfile = user?.profiles?.find(
                    p => p.type.toLowerCase() === profile.type.toLowerCase() && p.id === user?.current_profile
                  );

                  return (
                    <button
                      key={profile.type}
                      onClick={() => isEnabled && handleProfileSwitch(profile.path, profile.type)}
                      disabled={!isEnabled}
                      className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all
                        ${isEnabled
                          ? "text-slate-700 hover:bg-white hover:shadow-sm hover:text-[#ff8211] cursor-pointer"
                          : "text-slate-400 opacity-50 cursor-not-allowed bg-slate-50"
                        }
                        ${isCurrentProfile ? "bg-orange-50 border border-orange-200" : ""}`}
                    >
                      <div className={`p-1.5 rounded-full ${isEnabled && !isLoadingProfileSwitch ? profile.colorClass : "bg-slate-200 text-slate-400"}`}>
                        <Icon className="text-xs" />
                      </div>
                      <div className="text-left flex-1 flex items-center justify-between">
                        <p className="font-medium">{profile.type}</p>
                        {!createdProfiles.includes(profile.type) && <span className="text-[10px] bg-slate-200 px-1.5 rounded text-slate-500">Create</span>}
                        {isCurrentProfile && (
                          <div className="flex items-center gap-1 text-[#ff8211]">
                            <Check className="h-4 w-4" />
                            <span className="text-[10px] font-semibold">Active</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-2 mt-1 border-t border-slate-100">
                <button
                  onClick={() => handleProfileSwitch("/role")}
                  disabled={isLoadingProfileSwitch}
                  className={`w-full flex items-center justify-center gap-2 rounded-md bg-[#ff8211] px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors ${isLoadingProfileSwitch
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#ff7906]"
                    }`}
                >
                  <UserPlus className="h-4 w-4" />
                  Create Profile
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getProfiles, 
  hasProfile, 
  getProfile, 
  getCurrentProfile,
  getCreatedProfileTypes 
} from "../../utils/auth";
import { FaUserGraduate, FaUserTie, FaBuilding, FaStore } from "react-icons/fa";
import { Lock, CheckCircle2 } from "lucide-react";

/**
 * ProfileDashboardSelector Component
 * 
 * Demonstrates dynamic profile checking and conditional UI rendering
 * based on what profiles the user has created in localStorage.
 */
const ProfileDashboardSelector = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const navigate = useNavigate();

  // Available dashboard types
  const dashboardTypes = [
    { 
      type: "trainee", 
      label: "Trainee Dashboard", 
      icon: FaUserGraduate,
      path: "/trainee/dashboard",
      color: "blue"
    },
    { 
      type: "trainer", 
      label: "Trainer Dashboard", 
      icon: FaUserTie,
      path: "/trainer/dashboard",
      color: "purple"
    },
    { 
      type: "gym", 
      label: "Gym Dashboard", 
      icon: FaBuilding,
      path: "/gym/dashboard",
      color: "orange"
    },
    { 
      type: "store", 
      label: "Store Dashboard", 
      icon: FaStore,
      path: "/store/dashboard",
      color: "green"
    }
  ];

  useEffect(() => {
    // Load profiles when component mounts
    const userProfiles = getProfiles();
    setProfiles(userProfiles);

    // Get current active profile
    const current = getCurrentProfile();
    setCurrentProfile(current);
  }, []);

  const handleDashboardClick = (type, path) => {
    // Check if user has the profile
    if (hasProfile(type)) {
      navigate(path);
    } else {
      alert(`You do not have a ${type} profile.`);
    }
  };

  const colorMap = {
    blue: "bg-blue-100 text-blue-700 border-blue-300",
    purple: "bg-purple-100 text-purple-700 border-purple-300",
    orange: "bg-orange-100 text-orange-700 border-orange-300",
    green: "bg-green-100 text-green-700 border-green-300",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Select Dashboard</h1>
        <p className="text-slate-600">
          Choose a dashboard to access. You have {profiles.length} profile(s) created.
        </p>
        {currentProfile && (
          <p className="text-sm text-slate-500 mt-2">
            Current active profile: <span className="font-semibold">{currentProfile.type}</span>
          </p>
        )}
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dashboardTypes.map((dashboard) => {
          const userHasProfile = hasProfile(dashboard.type);
          const userProfile = getProfile(dashboard.type);
          const Icon = dashboard.icon;
          
          return (
            <button
              key={dashboard.type}
              onClick={() => handleDashboardClick(dashboard.type, dashboard.path)}
              disabled={!userHasProfile}
              className={`
                relative p-6 rounded-lg border-2 transition-all duration-200
                ${userHasProfile 
                  ? `${colorMap[dashboard.color]} hover:shadow-lg hover:scale-105 cursor-pointer` 
                  : "bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed opacity-60"
                }
              `}
            >
              {/* Profile Status Badge */}
              <div className="absolute top-3 right-3">
                {userHasProfile ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <Lock className="h-5 w-5 text-slate-400" />
                )}
              </div>

              {/* Icon */}
              <div className="flex items-center gap-4 mb-3">
                <div className={`p-3 rounded-full ${userHasProfile ? colorMap[dashboard.color] : "bg-slate-200"}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold">{dashboard.label}</h3>
                  {userProfile && (
                    <p className="text-xs opacity-75">Profile ID: {userProfile.id}</p>
                  )}
                </div>
              </div>

              {/* Status Message */}
              {!userHasProfile && (
                <p className="text-xs text-slate-500 mt-2">
                  You do not have a {dashboard.type} profile.
                </p>
              )}
            </button>
          );
        })}
      </div>

      {/* Create Profile CTA */}
      {profiles.length < 4 && (
        <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>Want access to more dashboards?</strong> Create additional profiles to unlock more features.
          </p>
          <button
            onClick={() => navigate("/role")}
            className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            Create New Profile
          </button>
        </div>
      )}

      {/* Debug Info (Development Only) */}
      <div className="mt-8 p-4 bg-slate-100 rounded-lg">
        <h3 className="font-semibold text-slate-700 mb-2">Profile Debug Info:</h3>
        <pre className="text-xs text-slate-600 overflow-auto">
          {JSON.stringify(profiles, null, 2)}
        </pre>
        <p className="text-xs text-slate-500 mt-2">
          Created Profile Types: {getCreatedProfileTypes().join(", ") || "None"}
        </p>
      </div>
    </div>
  );
};

export default ProfileDashboardSelector;

import { useState, useEffect } from "react";
import { RefreshCw, Check } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useProfile } from "../../context/ProfileContext";

/**
 * ProfileSwitcher Component
 * 
 * Displays a dropdown of all user profiles and allows switching between them.
 * Uses ProfileContext for state management - automatically updates all components
 * when profile changes.
 */
const ProfileSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  const { profiles, currentProfile, switchProfile } = useProfile();

  // Icon mapping for profile types
  const getProfileIcon = (type) => {
    const icons = {
      trainee: "👤",
      trainer: "💪",
      gym: "🏋️",
      store: "🏪"
    };
    return icons[type?.toLowerCase()] || "📋";
  };

  // Color mapping for profile types
  const getProfileColor = (type) => {
    const colors = {
      trainee: "bg-blue-100 text-blue-700 border-blue-300",
      trainer: "bg-purple-100 text-purple-700 border-purple-300",
      gym: "bg-orange-100 text-orange-700 border-orange-300",
      store: "bg-green-100 text-green-700 border-green-300"
    };
    return colors[type?.toLowerCase()] || "bg-slate-100 text-slate-700 border-slate-300";
  };

  const handleSwitchProfile = (profile) => {
    const success = switchProfile(profile.id);
    
    if (success) {
      setIsOpen(false);
      showToast(`Switched to ${profile.type} profile`, { type: "success" });
    } else {
      showToast("Failed to switch profile", { type: "error" });
    }
  };

  if (profiles.length === 0) {
    return null; // Don't show if no profiles
  }

  return (
    <div className="relative">
      {/* Current Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
          currentProfile 
            ? getProfileColor(currentProfile.type)
            : "bg-slate-100 text-slate-700 border-slate-300"
        }`}
      >
        <span className="text-lg">{currentProfile ? getProfileIcon(currentProfile.type) : "📋"}</span>
        <span className="font-medium text-sm capitalize">
          {currentProfile?.type || "Select Profile"}
        </span>
        <RefreshCw className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg border border-slate-200 shadow-lg z-50 overflow-hidden">
            <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-semibold text-slate-600 uppercase">Switch Profile</p>
            </div>

            <div className="py-1">
              {profiles.map((profile) => {
                const isActive = currentProfile?.id === profile.id;
                
                return (
                  <button
                    key={profile.id}
                    onClick={() => handleSwitchProfile(profile)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                      isActive 
                        ? `${getProfileColor(profile.type)} font-medium` 
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-lg">{getProfileIcon(profile.type)}</span>
                    <span className="flex-1 text-left capitalize">{profile.type}</span>
                    {isActive && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSwitcher;

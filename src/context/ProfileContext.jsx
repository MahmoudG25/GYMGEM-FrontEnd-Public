import { createContext, useContext, useState, useEffect } from "react";
import { getUser, getProfiles, getCurrentProfile } from "../utils/auth";

/**
 * ProfileContext
 * 
 * Provides profile state and switching functionality to all components.
 * Any component using this context will automatically re-render when the profile changes.
 */
const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load initial data from localStorage
  const loadProfileData = () => {
    const userData = getUser();
    const userProfiles = getProfiles();
    const current = getCurrentProfile();

    setUser(userData);
    setProfiles(userProfiles);
    setCurrentProfile(current);
    setLoading(false);
  };

  useEffect(() => {
    loadProfileData();

    // Listen for profile change events from other tabs/windows
    const handleStorageChange = () => {
      loadProfileData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  /**
   * Switch to a different profile
   * @param {number} profileId - The ID of the profile to switch to
   * @returns {boolean} - True if successful, false otherwise
   */
  const switchProfile = (profileId) => {
    try {
      const profile = profiles.find(p => p.id === profileId);
      
      if (!profile) {
        console.error(`Profile with ID ${profileId} not found`);
        return false;
      }

      // Update localStorage
      const userData = getUser();
      if (!userData) {
        console.error("No user found in localStorage");
        return false;
      }

      userData.current_profile = profileId;
      localStorage.setItem("user", JSON.stringify(userData));

      // Update context state (triggers re-render)
      setCurrentProfile(profile);
      setUser(userData);

      // Dispatch custom event for components not using context
      window.dispatchEvent(new CustomEvent('profileChanged', { 
        detail: { profileId, profile } 
      }));

      return true;
    } catch (error) {
      console.error("Error switching profile:", error);
      return false;
    }
  };

  /**
   * Check if current profile has access to a specific type
   * @param {string} requiredType - The required profile type
   * @returns {boolean} - True if access granted
   */
  const hasAccess = (requiredType) => {
    if (!currentProfile) return false;
    return currentProfile.type?.toLowerCase() === requiredType?.toLowerCase();
  };

  /**
   * Check if user has a profile of a specific type
   * @param {string} type - The profile type to check
   * @returns {boolean} - True if user has this profile type
   */
  const hasProfileType = (type) => {
    return profiles.some(p => p.type?.toLowerCase() === type?.toLowerCase());
  };

  const value = {
    user,
    profiles,
    currentProfile,
    loading,
    switchProfile,
    hasAccess,
    hasProfileType,
    refreshProfiles: loadProfileData
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

/**
 * Hook to access profile context
 * @returns {Object} Profile context value
 */
export const useProfile = () => {
  const context = useContext(ProfileContext);
  
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  
  return context;
};

export default ProfileContext;

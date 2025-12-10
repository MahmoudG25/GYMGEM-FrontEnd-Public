import { jwtDecode } from "jwt-decode";

/**
 * Checks if the user is currently logged in.
 * Returns true if an access token exists in localStorage.
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("access");
  return !!token;
};

/**
 * Retrieves the user object from localStorage.
 * Returns the user object or null if not found.
 */
export const getUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

/**
 * Retrieves the list of profiles from the user object in localStorage.
 * Returns an array of profile objects or an empty array.
 * 
 * Expected localStorage structure:
 * {
 *   id: 38,
 *   username: "username",
 *   email: "email@example.com",
 *   current_profile: 42,
 *   profiles: [
 *     {type: "trainer", id: 42},
 *     {type: "trainee", id: 43}
 *   ]
 * }
 */
export const getProfiles = () => {
  try {
    const user = getUser();
    if (!user || !user.profiles) return [];
    return Array.isArray(user.profiles) ? user.profiles : [];
  } catch (error) {
    console.error("Error retrieving profiles:", error);
    return [];
  }
};

/**
 * Checks if the user has a specific profile type.
 * @param {string} type - The profile type to check (e.g., "trainer", "trainee", "gym", "store")
 * @returns {boolean} - True if the profile exists
 */
export const hasProfile = (type) => {
  const profiles = getProfiles();
  if (!Array.isArray(profiles) || profiles.length === 0) return false;

  // Case-insensitive check
  return profiles.some(p => p.type?.toLowerCase() === type.toLowerCase());
};

/**
 * Gets a specific profile by type.
 * @param {string} type - The profile type to retrieve
 * @returns {object|null} - The profile object or null
 */
export const getProfile = (type) => {
  const profiles = getProfiles();
  if (!Array.isArray(profiles)) return null;

  return profiles.find(p => p.type?.toLowerCase() === type.toLowerCase()) || null;
};

/**
 * Gets the current active profile ID.
 * @returns {number|null} - The current profile ID or null
 */
export const getCurrentProfileId = () => {
  const user = getUser();
  return user?.current_profile || null;
};

/**
 * Gets the current active profile object.
 * @returns {object|null} - The current profile object or null
 */
export const getCurrentProfile = () => {
  const user = getUser();
  const currentProfileId = user?.current_profile;

  if (!currentProfileId) return null;

  const profiles = getProfiles();
  return profiles.find(p => p.id === currentProfileId) || null;
};

/**
 * Returns an array of profile type strings that the user has created.
 * Useful for the UserDropdown component.
 * @returns {string[]} - Array of profile types (e.g., ["Trainee", "Trainer", "Gym"])
 */
export const getCreatedProfileTypes = () => {
  const profiles = getProfiles();
  // Capitalize first letter to match the dropdown format
  return profiles.map(p => {
    const type = p.type || "";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  });
};

/**
 * Switches the current active profile.
 * Updates the current_profile field in the user object in localStorage.
 * @param {number} profileId - The ID of the profile to switch to
 * @returns {boolean} - True if successful, false otherwise
 */
export const switchCurrentProfile = (profileId) => {
  try {
    const user = getUser();
    if (!user) {
      console.error("No user found in localStorage");
      return false;
    }

    const profiles = user.profiles || [];
    const profileExists = profiles.some(p => p.id === profileId);

    if (!profileExists) {
      console.error(`Profile with ID ${profileId} not found`);
      return false;
    }

    user.current_profile = profileId;
    localStorage.setItem("user", JSON.stringify(user));

    // Dispatch a custom event so components can react to profile changes
    window.dispatchEvent(new CustomEvent('profileChanged', { detail: { profileId } }));

    return true;
  } catch (error) {
    console.error("Error switching profile:", error);
    return false;
  }
};

/**
 * Checks if the current active profile has access to a specific profile type.
 * @param {string} requiredType - The required profile type (e.g., "trainer", "trainee", "gym")
 * @returns {boolean} - True if access is granted, false otherwise
 */
export const checkAccess = (requiredType) => {
  try {
    const currentProfile = getCurrentProfile();
    if (!currentProfile) return false;

    // Case-insensitive comparison
    return currentProfile.type?.toLowerCase() === requiredType.toLowerCase();
  } catch (error) {
    console.error("Error checking access:", error);
    return false;
  }
};

/**
 * Gets the type of the current active profile.
 * @returns {string|null} - The profile type or null
 */
export const getCurrentProfileType = () => {
  const profile = getCurrentProfile();
  return profile?.type || null;
};

// ============================================================================
// JWT TOKEN VALIDATION UTILITIES
// ============================================================================

/**
 * Decodes a JWT token and returns its payload.
 * 
 * WHAT IT DOES:
 * - JWT tokens are base64-encoded strings with 3 parts: header.payload.signature
 * - This function extracts and decodes the middle part (payload) which contains:
 *   - user_id: The user's ID
 *   - exp: Expiration timestamp (Unix time in seconds)
 *   - iat: Issued at timestamp
 *   - Other custom claims
 * 
 * @param {string} token - The JWT token to decode
 * @returns {object|null} - Decoded token payload or null if invalid
 * 
 * @example
 * const token = localStorage.getItem("access");
 * const payload = decodeToken(token);
 * console.log("User ID:", payload.user_id);
 * console.log("Expires at:", new Date(payload.exp * 1000));
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null;
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Checks if a JWT token is expired.
 * 
 * HOW IT WORKS:
 * 1. Decodes the token to get the 'exp' (expiration) field
 * 2. Converts current time to Unix timestamp (seconds since 1970)
 * 3. Compares: if current time > expiration time, token is expired
 * 
 * IMPORTANT: JWT 'exp' is in SECONDS, JavaScript Date.now() is in MILLISECONDS
 * So we divide Date.now() by 1000 to compare apples-to-apples
 * 
 * @param {string} token - The JWT token to check
 * @returns {boolean} - True if expired, false if still valid
 * 
 * @example
 * const token = localStorage.getItem("access");
 * if (isTokenExpired(token)) {
 *   console.log("Token has expired!");
 * }
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    // Get current time in seconds (not milliseconds)
    const currentTime = Math.floor(Date.now() / 1000);

    // If current time is past expiration, token is expired
    return currentTime > decoded.exp;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true; // Assume expired on error for safety
  }
};

/**
 * Gets the expiration timestamp of a token.
 * 
 * @param {string} token - The JWT token
 * @returns {number|null} - Unix timestamp (seconds) or null if invalid
 * 
 * @example
 * const token = localStorage.getItem("access");
 * const exp = getTokenExpirationTime(token);
 * const expiryDate = new Date(exp * 1000);
 * console.log("Token expires on:", expiryDate.toLocaleString());
 */
export const getTokenExpirationTime = (token) => {
  try {
    const decoded = decodeToken(token);
    return decoded?.exp || null;
  } catch (error) {
    console.error("Error getting token expiration time:", error);
    return null;
  }
};

/**
 * Gets the number of seconds remaining until a token expires.
 * 
 * USEFUL FOR:
 * - Displaying "Token expires in 5 minutes" warnings
 * - Deciding whether to proactively refresh before expiration
 * - Logging/debugging token lifetimes
 * 
 * @param {string} token - The JWT token
 * @returns {number} - Seconds until expiration (negative if already expired)
 * 
 * @example
 * const token = localStorage.getItem("access");
 * const timeLeft = getTokenTimeRemaining(token);
 * 
 * if (timeLeft < 300) {
 *   console.log("Token expires in less than 5 minutes!");
 * }
 * 
 * if (timeLeft < 0) {
 *   console.log("Token already expired", Math.abs(timeLeft), "seconds ago");
 * }
 */
export const getTokenTimeRemaining = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return 0;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime; // Positive = time left, Negative = expired
  } catch (error) {
    console.error("Error getting token time remaining:", error);
    return 0;
  }
};

/**
 * Checks if the current access token in localStorage is valid and not expired.
 * 
 * THIS IS YOUR "IS USER STILL LOGGED IN?" CHECK
 * 
 * Use this to:
 * - Check authentication status before rendering protected pages
 * - Decide whether to show login vs dashboard
 * - Validate session on app startup
 * 
 * @returns {boolean} - True if access token is valid and not expired
 * 
 * @example
 * // In a protected route component:
 * import { isAccessTokenValid } from "../utils/auth";
 * 
 * useEffect(() => {
 *   if (!isAccessTokenValid()) {
 *     navigate("/login");
 *   }
 * }, []);
 */
export const isAccessTokenValid = () => {
  const token = localStorage.getItem("access");
  if (!token) return false;
  return !isTokenExpired(token);
};

/**
 * Checks if the current refresh token in localStorage is valid and not expired.
 * 
 * WHY THIS MATTERS:
 * - If refresh token is expired, user MUST login again (no way to get new tokens)
 * - If refresh token is valid, we can always get new access tokens
 * - This is your "can we recover from expired access token?" check
 * 
 * @returns {boolean} - True if refresh token is valid and not expired
 * 
 * @example
 * import { isRefreshTokenValid } from "../utils/auth";
 * 
 * if (!isRefreshTokenValid()) {
 *   // Refresh token dead, must logout
 *   alert("Your session has fully expired. Please login again.");
 *   window.location.href = "/login";
 * }
 */
export const isRefreshTokenValid = () => {
  const token = localStorage.getItem("refresh");
  if (!token) return false;
  return !isTokenExpired(token);
};

/**
 * Gets a comprehensive status of all authentication tokens.
 * 
 * THIS GIVES YOU THE COMPLETE PICTURE of authentication state.
 * 
 * Use this for:
 * - Debugging authentication issues
 * - Displaying token status in settings/debug page
 * - Logging authentication state
 * - Deciding proactive refresh strategy
 * 
 * @returns {object} - Complete token status information
 * 
 * @example
 * import { checkTokensStatus } from "../utils/auth";
 * 
 * const status = checkTokensStatus();
 * console.log(status);
 * // {
 * //   accessTokenValid: true,
 * //   refreshTokenValid: true,
 * //   accessTokenExpiresIn: 1800,  // 30 minutes
 * //   refreshTokenExpiresIn: 604800,  // 7 days
 * //   needsRefresh: false,
 * //   fullyExpired: false
 * // }
 * 
 * if (status.needsRefresh) {
 *   console.log("Access token expires soon, should refresh proactively");
 * }
 * 
 * if (status.fullyExpired) {
 *   console.log("Both tokens expired - must logout");
 * }
 */
export const checkTokensStatus = () => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  const accessTokenExpiresIn = accessToken ? getTokenTimeRemaining(accessToken) : 0;
  const refreshTokenExpiresIn = refreshToken ? getTokenTimeRemaining(refreshToken) : 0;

  return {
    // Are tokens valid?
    accessTokenValid: isAccessTokenValid(),
    refreshTokenValid: isRefreshTokenValid(),

    // How much time left?
    accessTokenExpiresIn,  // seconds (negative if expired)
    refreshTokenExpiresIn,  // seconds (negative if expired)

    // Should we refresh proactively?
    // If access token expires in < 5 minutes but refresh is still good
    needsRefresh: accessTokenExpiresIn < 300 && refreshTokenExpiresIn > 0,

    // Both tokens dead? Must logout
    fullyExpired: !isAccessTokenValid() && !isRefreshTokenValid(),
  };
};

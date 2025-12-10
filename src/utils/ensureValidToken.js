import axios from "axios";
import { getTokenTimeRemaining, isRefreshTokenValid, decodeToken } from "./auth";

/**
 * ensureValidToken()
 * ==================
 * 
 * Ensures the user has a valid access token before performing an action.
 * 
 * ENHANCED TO HANDLE:
 * ✅ Expired tokens
 * ✅ Corrupted/invalid tokens (manually changed in DevTools)
 * ✅ Missing tokens
 * ✅ Tokens that can't be decoded
 * 
 * USE CASES:
 * - Profile switching
 * - Any UI action that needs authentication
 * - Before making important API calls
 * - Any operation that reads/uses the access token directly
 * 
 * WHAT IT DOES:
 * 1. Validates token exists and can be decoded
 * 2. Checks if expired or expires soon (< 5 min)
 * 3. If invalid/expired, automatically refreshes using refresh token
 * 4. Returns true if refresh successful, false if user logged out
 * 
 * @returns {Promise<boolean>} - True if valid token available, false if user logged out
 * 
 * @example
 * // Before switching profile
 * const hasValidToken = await ensureValidToken();
 * if (hasValidToken) {
 *   switchCurrentProfile(newProfileId);
 * }
 */
export const ensureValidToken = async () => {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    // No tokens? User isn't logged in
    if (!accessToken || !refreshToken) {
        console.warn("⚠️ ensureValidToken: No tokens found");
        return false;
    }

    /**
     * CRITICAL: Validate refresh token first
     * ======================================
     * If refresh token is invalid, we can't recover
     * Must logout user immediately
     */
    if (!isRefreshTokenValid()) {
        console.error("🔒 ensureValidToken: Refresh token expired. Logging out.");

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        window.location.href = "/login";
        return false;
    }

    /**
     * NEW: Try to decode and validate access token
     * =============================================
     * 
     * This catches scenarios where user:
     * - Manually changes token in DevTools
     * - Token format is corrupted
     * - Token can't be parsed
     * 
     * If we can't decode it, we treat it as invalid and refresh
     */
    let timeRemaining;
    let tokenIsValid = false;

    try {
        // Try to decode the token
        const decoded = decodeToken(accessToken);

        if (!decoded || !decoded.exp) {
            // Token exists but can't be decoded or has no expiration
            console.warn("⚠️ ensureValidToken: Token is corrupted or invalid. Will refresh.");
            timeRemaining = -1; // Force refresh
        } else {
            // Token decoded successfully, check time remaining
            timeRemaining = getTokenTimeRemaining(accessToken);
            tokenIsValid = timeRemaining > 0;
        }
    } catch (error) {
        // Error decoding token - it's corrupted!
        console.warn("⚠️ ensureValidToken: Failed to decode token. Will refresh.", error);
        timeRemaining = -1; // Force refresh
    }

    /**
     * Refresh token if:
     * 1. Can't decode it (corrupted)
     * 2. Already expired (timeRemaining <= 0)
     * 3. Expires soon (< 5 minutes)
     */
    if (timeRemaining < 300) { // < 5 minutes (or invalid/corrupted)
        if (timeRemaining < 0) {
            console.log(`🔄 ensureValidToken: Token is invalid/corrupted. Refreshing...`);
        } else {
            console.log(`⏰ ensureValidToken: Access token expires in ${Math.floor(timeRemaining / 60)} min. Refreshing...`);
        }

        try {
            // Call refresh endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/refresh-token",
                {},
                {
                    headers: {
                        refresh: refreshToken,
                    },
                }
            );

            const newAccessToken = response.data.access;
            localStorage.setItem("access", newAccessToken);

            console.log("✅ ensureValidToken: Token refreshed successfully!");
            return true;

        } catch (error) {
            console.error("❌ ensureValidToken: Token refresh failed:", error);

            // Refresh failed - probably refresh token expired too
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");

            // Redirect to login
            window.location.href = "/login";
            return false;
        }
    }

    // Token is valid and has plenty of time left
    console.log(`✅ ensureValidToken: Token is valid (${Math.floor(timeRemaining / 60)} min remaining)`);
    return true;
};

export default ensureValidToken;

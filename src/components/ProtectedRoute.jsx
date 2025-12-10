import { Navigate, useLocation } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useEffect, useRef } from "react";
import { isAccessTokenValid, isRefreshTokenValid } from "../utils/auth";

/**
 * ProtectedRoute component that guards routes based on authentication and profile permissions
 * 
 * SECURITY ENHANCEMENTS:
 * - ✅ Validates token existence (not just user object)
 * - ✅ Checks if tokens are expired
 * - ✅ Clears invalid data and redirects to login
 * - ✅ Validates profile permissions
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The component to render if authorized
 * @param {string} props.requiredProfile - Required profile type (e.g., "trainer", "trainee", "gym", "store")
 */
const ProtectedRoute = ({ children, requiredProfile }) => {
    const location = useLocation();
    const { showToast } = useToast();
    const toastShownRef = useRef(false);

    /**
     * CRITICAL SECURITY CHECK: Validate Tokens First!
     * ================================================
     * 
     * WHY THIS IS IMPORTANT:
     * - User object in localStorage doesn't mean user is authenticated
     * - Tokens could be deleted, expired, or invalid
     * - We must check both access AND refresh tokens
     * 
     * WHAT WE CHECK:
     * 1. Do access & refresh tokens exist in localStorage?
     * 2. Are they valid (not expired)?
     * 3. If either check fails → clear everything and redirect to login
     */

    // Check 1: Do tokens exist?
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    if (!accessToken || !refreshToken) {
        // Tokens are missing - user deleted them or they were never set
        console.warn("🔒 Tokens missing. Clearing session and redirecting to login.");

        // Clean up localStorage (remove stale user data)
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        // Show message to user
        if (!toastShownRef.current) {
            showToast("Your session has expired. Please login again.", { type: "warning" });
            toastShownRef.current = true;
        }

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check 2: Are both tokens valid (not expired)?
    // CRITICAL: Wrapped in try-catch to handle corrupted tokens!
    let accessValid = false;
    let refreshValid = false;

    try {
        accessValid = isAccessTokenValid();
    } catch (error) {
        // Access token corrupted - that's OK if refresh is valid!
        console.log("⚠️ ProtectedRoute: Access token invalid/corrupted");
        accessValid = false;
    }

    try {
        refreshValid = isRefreshTokenValid();
    } catch (error) {
        // Refresh token corrupted - BAD!
        console.error("🔒 ProtectedRoute: Refresh token invalid/corrupted");
        refreshValid = false;
    }

    // ONLY logout if BOTH tokens are invalid
    if (!accessValid && !refreshValid) {
        // Both tokens expired - user session is completely dead
        console.warn("🔒 Both tokens expired. Clearing session and redirecting to login.");

        // Clean up localStorage
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        // Show message to user
        if (!toastShownRef.current) {
            showToast("Your session has fully expired. Please login again.", { type: "warning" });
            toastShownRef.current = true;
        }

        return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (!accessValid && refreshValid) {
        // Access bad, refresh good - Let it slide! axiosInstance will handle it
        console.log("✅ ProtectedRoute: Access invalid but refresh valid. Will auto-refresh on API call.");
    }

    // Note: If access token expired but refresh token valid, axiosInstance will handle it
    // (automatic refresh on first API call)

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // Check 3: User data must exist
    if (!user) {
        // Tokens exist but no user data? Inconsistent state - clear everything
        console.warn("🔒 User data missing but tokens exist. Clearing session.");

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check 4: If requiredProfile is specified, check if user has that profile
    if (requiredProfile) {
        const normalizedRequired = requiredProfile.toLowerCase();

        // Check if user has this profile type at all
        const hasProfile = user.profiles?.some(
            p => p.type.toLowerCase() === normalizedRequired
        );

        if (!hasProfile) {
            // User doesn't have this profile - redirect to create profile page
            useEffect(() => {
                if (!toastShownRef.current) {
                    showToast(
                        `You need to create a ${requiredProfile} profile to access this page.`,
                        { type: "error" }
                    );
                    toastShownRef.current = true;
                }
            }, [requiredProfile]);

            return <Navigate to="/role" state={{ from: location, requiredProfile }} replace />;
        }

        // Check if user has selected the correct profile
        const currentProfile = user.profiles?.find(p => p.id === user.current_profile);

        if (currentProfile?.type.toLowerCase() !== normalizedRequired) {
            // User has the profile but hasn't selected it
            useEffect(() => {
                if (!toastShownRef.current) {
                    showToast(
                        `Please switch to your ${requiredProfile} profile to access this page.`,
                        { type: "warning" }
                    );
                    toastShownRef.current = true;
                }
            }, [requiredProfile]);

            // Redirect to home or show a profile switch prompt
            return <Navigate to="/" state={{ from: location, requiredProfile }} replace />;
        }
    }

    // ✅ All checks passed - render the protected component
    return children;
};

export default ProtectedRoute;

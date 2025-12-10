import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAccessTokenValid, isRefreshTokenValid } from "../utils/auth";

/**
 * useAuthCheck Hook
 * ==================
 * 
 * This hook runs on EVERY page load and validates authentication tokens.
 * 
 * WHY WE NEED THIS:
 * - ProtectedRoute only runs on protected routes
 * - Public pages (Home, Courses, etc.) don't use ProtectedRoute
 * - If user deletes tokens while on Home page, they should be logged out
 * - This hook catches that scenario!
 * 
 * WHAT IT DOES:
 * 1. Checks if user object exists in localStorage
 * 2. If yes, validates that tokens also exist and are valid
 * 3. If tokens missing or invalid, clears localStorage and redirects to login
 * 4. If no user object, does nothing (user was never logged in)
 * 
 * USAGE:
 * Call this hook in App.jsx to protect ALL pages:
 * 
 * function App() {
 *   useAuthCheck();  // ← Add this line
 *   return <Routes>...</Routes>;
 * }
 */
export const useAuthCheck = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get user from localStorage
        const user = localStorage.getItem("user");

        // If no user, they were never logged in - no need to check tokens
        if (!user) {
            return;
        }

        // User object exists - we should also have tokens
        const accessToken = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");

        /**
         * SCENARIO 1: User deleted tokens manually
         * ----------------------------------------
         * User object exists but tokens are missing
         * This happens when user opens DevTools and deletes tokens
         */
        if (!accessToken || !refreshToken) {
            console.warn("🔒 useAuthCheck: Tokens missing. Logging out user.");

            // Clear all auth data
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");

            // Don't redirect if already on login/signup page
            if (location.pathname !== "/login" && location.pathname !== "/signup") {
                navigate("/login", {
                    replace: true,
                    state: { message: "Your session has expired. Please login again." }
                });
            }

            return;
        }

        /**
         * SCENARIO 2: Check if BOTH tokens are expired/invalid
         * ----------------------------------------------------
         * 
         * CRITICAL CHANGE - Wrapped in try-catch!
         * ========================================
         * 
         * WHY?
         * - If user manually corrupts access token, isAccessTokenValid() throws an error
         * - This was causing immediate logout BEFORE axiosInstance could auto-refresh!
         * 
         * NOW:
         * - We catch the error and treat it as "invalid"
         * - But we ONLY logout if BOTH tokens are invalid
         * - If access is bad but refresh is good, we let it slide!
         * - axiosInstance will auto-refresh on the next API call
         */
        let accessValid = false;
        let refreshValid = false;

        try {
            accessValid = isAccessTokenValid();
        } catch (error) {
            // Access token corrupted/can't decode - that's OK if refresh is valid!
            console.log("⚠️ useAuthCheck: Access token invalid/corrupted");
            accessValid = false;
        }

        try {
            refreshValid = isRefreshTokenValid();
        } catch (error) {
            // Refresh token corrupted - this is BAD!
            console.error("🔒 useAuthCheck: Refresh token invalid/corrupted");
            refreshValid = false;
        }

        /**
         * ONLY LOGOUT IF BOTH TOKENS ARE INVALID!
         */
        if (!accessValid && !refreshValid) {
            console.warn("🔒 useAuthCheck: Both tokens expired/invalid. Logging out user.");

            // Clear all auth data
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            localStorage.removeItem("user");

            // Don't redirect if already on login/signup page
            if (location.pathname !== "/login" && location.pathname !== "/signup") {
                navigate("/login", {
                    replace: true,
                    state: { message: "Your session has fully expired. Please login again." }
                });
            }
        } else if (!accessValid && refreshValid) {
            // Access bad, refresh good - Let axiosInstance handle it!
            console.log("✅ useAuthCheck: Access invalid but refresh valid. Auto-refresh will happen on next request.");
        }

        // If access expired but refresh valid, that's OK
        // axiosInstance will handle refresh on next API call

    }, [navigate, location.pathname]); // Run on every route change
};

export default useAuthCheck;

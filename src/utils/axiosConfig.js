import axios from "axios";

/**
 * ============================================================================
 * AXIOS INSTANCE WITH AUTOMATIC TOKEN MANAGEMENT
 * ============================================================================
 * 
 * This configured axios instance automatically:
 * - Attaches access tokens to requests
 * - Detects corrupted/invalid tokens BEFORE sending requests
 * - Refreshes expired or corrupted tokens proactively
 * - Handles 401 errors by refreshing and retrying
 * - Logs out users when refresh fails
 */

// Create a custom axios instance with base URL
const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000", // Your Django backend URL
    timeout: 10000, // 10 second timeout
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * ===========================================================================
 * REQUEST INTERCEPTOR - VALIDATES AND REFRESHES TOKENS BEFORE SENDING
 * ===========================================================================
 */

// Import token utilities
import { getTokenTimeRemaining, decodeToken } from "./auth.js";

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("access");
        const refreshToken = localStorage.getItem("refresh");

        if (token) {
            /**
             * CRITICAL: Validate token BEFORE using it
             * =========================================
             * 
             * This prevents browser errors from invalid HTTP headers!
             * 
             * Steps:
             * 1. Try to decode the token
             * 2. If decode fails → token is corrupted → refresh it!
             * 3. If decode succeeds → check expiration
             * 4. If near expiration → refresh it!
             * 5. Only use token if it's valid
             */

            let tokenIsValid = false;
            let needsRefresh = false;

            try {
                const decoded = decodeToken(token);

                if (!decoded || !decoded.exp) {
                    // Can't decode or no expiration → corrupted!
                    console.warn("⚠️ Token is corrupted/invalid");
                    needsRefresh = true;
                } else {
                    // Token decoded successfully → check expiration
                    const timeRemaining = getTokenTimeRemaining(token);

                    if (timeRemaining <= 0) {
                        console.log("⏰ Token expired");
                        needsRefresh = true;
                    } else if (timeRemaining < 300) {
                        console.log(`⏰ Token expires in ${Math.floor(timeRemaining / 60)} min`);
                        needsRefresh = true;
                    } else {
                        // Token is valid and not expiring soon!
                        tokenIsValid = true;
                    }
                }
            } catch (error) {
                // Decode failed → corrupted token!
                console.warn("⚠️ Failed to decode token:", error.message);
                needsRefresh = true;
            }

            /**
             * Refresh token if needed
             */
            if (needsRefresh && refreshToken) {
                console.log("🔄 Refreshing token...");

                try {
                    // Backend expects: headers.get("refresh")
                    const response = await axios.post(
                        "http://127.0.0.1:8000/api/auth/refresh-token",
                        {},
                        {
                            headers: {
                                "refresh": refreshToken,
                            },
                        }
                    );

                    const newAccessToken = response.data.access;
                    localStorage.setItem("access", newAccessToken);

                    console.log("✅ Token refreshed successfully!");

                    // Use NEW token for this request
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return config;

                } catch (error) {
                    console.error("❌ REQUEST INTERCEPTOR: Token refresh failed!");
                    console.error("Error details:", {
                        message: error.message,
                        response: error.response?.data,
                        status: error.response?.status,
                        headers: error.response?.headers
                    });

                    // Refresh failed → logout
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    localStorage.removeItem("user");
                    window.location.href = "/login";

                    return Promise.reject(new Error("Authentication failed"));
                }
            }

            // Token is valid → use it
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * ===========================================================================
 * RESPONSE INTERCEPTOR - HANDLES 401 ERRORS BY REFRESHING AND RETRYING
 * ===========================================================================
 */

let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, newToken = null) => {
    failedRequestsQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(newToken);
        }
    });
    failedRequestsQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // If already refreshing, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                })
                    .then((newToken) => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;
            const refreshToken = localStorage.getItem("refresh");

            if (!refreshToken) {
                console.error("❌ No refresh token. Logging out...");
                isRefreshing = false;
                processQueue(error, null);

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                localStorage.removeItem("user");
                window.location.href = "/login";

                return Promise.reject(error);
            }

            try {
                console.log("🔄 401 error. Refreshing token...");

                // Backend expects: headers.get("refresh")
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/auth/refresh-token",
                    {},
                    {
                        headers: {
                            "refresh": refreshToken,
                        },
                    }
                );

                const newAccessToken = response.data.access;
                localStorage.setItem("access", newAccessToken);

                console.log("✅ Token refreshed!");

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                processQueue(null, newAccessToken);
                isRefreshing = false;

                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.error("❌ RESPONSE INTERCEPTOR: Token refresh failed!");
                console.error("Refresh error details:", {
                    message: refreshError.message,
                    response: refreshError.response?.data,
                    status: refreshError.response?.status,
                    refreshTokenUsed: refreshToken ? "Yes (exists)" : "No (missing)"
                });

                processQueue(refreshError, null);
                isRefreshing = false;

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                localStorage.removeItem("user");
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Export for use in other files
export default axiosInstance;

// Also export token status checker
export { checkTokensStatus } from "./auth.js";

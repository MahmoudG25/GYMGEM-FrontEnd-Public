import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { useProfile } from "../../context/ProfileContext";
import AccessDenied from "./AccessDenied";
import { useToast } from "../../context/ToastContext";

const ProtectedRoute = ({ allowedProfileType, children }) => {
  const location = useLocation();
  const { showToast } = useToast();
  const { currentProfile, hasProfileType, hasAccess, loading } = useProfile();
  const isAuth = isAuthenticated();

  // Effect to show toast if redirecting to login
  useEffect(() => {
    if (!isAuth) {
      showToast("Please login first to access the dashboard.", { type: "error" });
    }
  }, [isAuth, showToast]);

  if (!isAuth) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Show loading state while context initializes
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If a specific profile type is required
  if (allowedProfileType) {
    // First check if user has this profile at all
    if (!hasProfileType(allowedProfileType)) {
      return <AccessDenied message={`You do not have a ${allowedProfileType} profile.`} />;
    }

    // Then check if the current active profile matches (uses context)
    if (!hasAccess(allowedProfileType)) {
      return (
        <AccessDenied 
          message={`You don't have access. Please switch to your ${allowedProfileType} profile first. (Current profile: ${currentProfile?.type || 'none'})`} 
        />
      );
    }
  }

  // Render children or Outlet
  return children ? children : <Outlet />;
};

export default ProtectedRoute;

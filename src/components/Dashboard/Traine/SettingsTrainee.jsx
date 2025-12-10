import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Trash2, LogOut } from "lucide-react";
import NavTraineDash from "./NavTraineDash";
import FooterDash from "../FooterDash";
import { useToast } from "../../../context/ToastContext";
import axiosInstance from "../../../utils/axiosConfig";

const SettingsTrainee = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [modals, setModals] = useState({
    deleteProfile: false,
    logoutAll: false,
  });

  const [formData, setFormData] = useState({
    deleteProfile: { password: "" },
  });

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Modal handlers
  const openModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  // Delete Profile handlers
  const handleDeleteProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      deleteProfile: { ...prev.deleteProfile, [name]: value },
    }));
  };

  const handleDeleteProfileSubmit = () => {
    const { password } = formData.deleteProfile;
    if (!password) {
      showToast("Please enter your password to confirm deletion.", { type: "error" });
      return;
    }

    // Mock validation logic
    closeModal("deleteProfile");
    showToast("Profile deleted successfully", { type: "success" });
    // In a real app, you would make an API call here and then redirect
    // navigate("/login");
  };

  /**
   * LOGOUT FROM ALL DEVICES
   * ------------------------
   * This function calls the backend endpoint to invalidate all refresh tokens
   * for this user, effectively logging them out from all devices.
   * 
   * Flow:
   * 1. Show loading state
   * 2. Call POST /api/auth/logout-all with access token (automatically added by axiosInstance)
   * 3. Clear all tokens from localStorage
   * 4. Redirect to login page
   * 5. Show success message
   */
  const handleLogoutFromAllDevices = async () => {
    setIsLoggingOut(true);

    try {
      // Call the logout-all endpoint
      // The axiosInstance automatically adds the Authorization header
      await axiosInstance.post("/api/auth/logout-all");

      // Clear all authentication data from localStorage
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      // Show success message
      showToast("Successfully logged out from all devices", { type: "success" });

      // Close the modal
      closeModal("logoutAll");

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 500);

    } catch (error) {
      console.error("Error logging out from all devices:", error);

      // Even if the API call fails, we should still log out locally
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      showToast("Logged out locally. Please log in again.", { type: "warning" });

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <NavTraineDash />
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Settings</h1>
            <p className="text-gray-500 mt-2">Manage your profile settings.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Management Section */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-[#ff8211]" />
                Profile Management
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("deleteProfile")}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors group border border-red-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-red-600">Delete Profile</p>
                      <p className="text-sm text-red-400">Permanently remove this profile from your account</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Security Section */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <LogOut className="w-5 h-5 text-[#ff8211]" />
                Security
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("logoutAll")}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-orange-50 transition-colors group border border-orange-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <LogOut className="w-5 h-5 text-[#ff8211]" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-[#ff8211]">Logout from All Devices</p>
                      <p className="text-sm text-orange-400">Sign out from all devices where you're logged in</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* DELETE PROFILE MODAL */}
      {modals.deleteProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all border-2 border-red-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-red-50">
              <h2 className="text-lg font-bold text-red-700 flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Delete Profile
              </h2>
              <button
                onClick={() => closeModal("deleteProfile")}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-red-500" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm text-red-700 font-medium">
                  Warning: This action cannot be undone. Please enter your password to proceed.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.deleteProfile.password}
                  onChange={handleDeleteProfileChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => closeModal("deleteProfile")}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfileSubmit}
                className="flex-1 bg-red-600 text-white py-2.5 font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGOUT FROM ALL DEVICES MODAL */}
      {modals.logoutAll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all border-2 border-orange-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-orange-50">
              <h2 className="text-lg font-bold text-[#ff8211] flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout from All Devices
              </h2>
              <button
                onClick={() => closeModal("logoutAll")}
                className="p-2 hover:bg-orange-100 rounded-full transition-colors"
                disabled={isLoggingOut}
              >
                <X className="h-5 w-5 text-[#ff8211]" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-sm text-orange-700 font-medium mb-2">
                  ⚠️ This will log you out from all devices
                </p>
                <p className="text-sm text-gray-600">
                  You will be signed out from all browsers and devices where you're currently logged in.
                  You'll need to log in again on each device.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Use this feature if you suspect unauthorized access to your account or
                  if you've logged in on a public/shared device.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => closeModal("logoutAll")}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutFromAllDevices}
                className="flex-1 bg-[#ff8211] text-white py-2.5 font-semibold rounded-lg hover:bg-[#e67300] transition-colors shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    Logout All Devices
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterDash />
    </>
  );
};

export default SettingsTrainee;

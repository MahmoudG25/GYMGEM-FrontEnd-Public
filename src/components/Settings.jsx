import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, CreditCard, X, UserPlus, Trash2, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useToast } from "../context/ToastContext";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const Settings = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [modals, setModals] = useState({
    changePassword: false,
    paymentInfo: false,
    deleteAccount: false,
  });

  const [formData, setFormData] = useState({
    changePassword: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    paymentInfo: { cardNumber: "", expiryDate: "", cvv: "", cardHolder: "" },
    deleteAccount: { password: "", confirmationPhrase: "" },
  });

  // Modal handlers
  const openModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  // Change Password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      changePassword: { ...prev.changePassword, [name]: value },
    }));
  };

  const handleSavePassword = async () => {
    if (
      formData.changePassword.newPassword !==
      formData.changePassword.confirmPassword
    ) {
      showToast("New passwords do not match!", { type: "error" });
      return;
    }

    // try {
    const token = localStorage.getItem('access');
    // Send POST request to backend to change password
    await axios.post(`${VITE_API_URL}/api/accounts/change-password`,
      {
        currentPassword: formData.changePassword.currentPassword,
        newPassword: formData.changePassword.newPassword,
        confirmPassword: formData.changePassword.confirmPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    closeModal("changePassword");
    showToast("Password changed successfully!", { type: "success" });
    setFormData((prev) => ({
      ...prev,
      changePassword: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    }));

    // } catch (error) {
    //   showToast("Error changing password", { type: "error" });
    // }
  };

  // Payment Info handlers
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      paymentInfo: { ...prev.paymentInfo, [name]: value },
    }));
  };

  const handleSavePayment = () => {
    closeModal("paymentInfo");
    showToast("Payment information saved successfully!", { type: "success" });
    setFormData((prev) => ({
      ...prev,
      paymentInfo: { cardNumber: "", expiryDate: "", cvv: "", cardHolder: "" },
    }));
  };

  // Delete Account handlers
  const handleDeleteAccountChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      deleteAccount: { ...prev.deleteAccount, [name]: value },
    }));
  };

  const handleDeleteAccountSubmit = async () => {
    const { password, confirmationPhrase } = formData.deleteAccount;
    const requiredPhrase = "I want to delete my account";

    if (!password) {
      showToast("Please enter your password to confirm deletion.", { type: "error" });
      return;
    }

    if (confirmationPhrase !== requiredPhrase) {
      showToast(`Please type exactly: "${requiredPhrase}"`, { type: "error" });
      return;
    }

    const token = localStorage.getItem('access');
    try {
      const resp = await axios.delete(
        `${VITE_API_URL}/api/accounts/detail`,
        {
          data: { password },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (resp.status === 204) {
        closeModal("deleteAccount");
        showToast("Account deleted successfully!", { type: "success" });
        localStorage.clear();
        navigate("/goodbye");
      }
      else {
        showToast(resp.data.message || "Error deleting account", { type: "error" });
      }

      console.log("rrrr:", resp.data);
    } catch (error) {
      showToast("Error deleting account", { type: "error" });
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-500 mt-2">Manage your account preferences and security.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Security Section */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#ff8211]" />
                Security
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("changePassword")}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <Lock className="w-5 h-5 text-[#ff8211]" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-500">Update your password and secure your account</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Billing Section */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#ff8211]" />
                Billing & Payment
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("paymentInfo")}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Payment Method</p>
                      <p className="text-sm text-gray-500">Manage your saved cards and billing info</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Account Management Section */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#ff8211]" />
                Account Management
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/role")}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                      <UserPlus className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Create Profile</p>
                      <p className="text-sm text-gray-500">Add a new profile type to your account</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                Danger Zone
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => openModal("deleteAccount")}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors group border border-red-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-red-600">Delete Account</p>
                      <p className="text-sm text-red-400">Permanently delete your account and all data</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CHANGE PASSWORD MODAL */}
      {modals.changePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
              <button
                onClick={() => closeModal("changePassword")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.changePassword.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#ff8211] focus:border-transparent transition-all"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.changePassword.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#ff8211] focus:border-transparent transition-all"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.changePassword.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#ff8211] focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => closeModal("changePassword")}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePassword}
                className="flex-1 bg-gradient-to-r from-[#ff8211] to-[#ff9a42] text-white py-2.5 font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT INFO MODAL */}
      {modals.paymentInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Payment Information</h2>
              <button
                onClick={() => closeModal("paymentInfo")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={formData.paymentInfo.cardHolder}
                  onChange={handlePaymentChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#ff8211] focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="0000 0000 0000 0000"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-[#ff8211] focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#ff8211] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#ff8211] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => closeModal("paymentInfo")}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePayment}
                className="flex-1 bg-gradient-to-r from-[#ff8211] to-[#ff9a42] text-white py-2.5 font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                Save Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {modals.deleteAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all border-2 border-red-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-red-50">
              <h2 className="text-lg font-bold text-red-700 flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                Delete Account
              </h2>
              <button
                onClick={() => closeModal("deleteAccount")}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-red-500" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm text-red-700 font-medium">
                  Warning: This will permanently delete your entire account and all associated data. This action cannot be undone.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.deleteAccount.password}
                  onChange={handleDeleteAccountChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmation
                </label>
                <p className="text-xs text-gray-600 mb-2">
                  Type the following phrase to confirm: <span className="font-mono font-bold text-red-600">"I want to delete my account"</span>
                </p>
                <input
                  type="text"
                  name="confirmationPhrase"
                  value={formData.deleteAccount.confirmationPhrase}
                  onChange={handleDeleteAccountChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all font-mono text-sm"
                  placeholder="I want to delete my account"
                />
                {formData.deleteAccount.confirmationPhrase === "I want to delete my account" && (
                  <p className="text-xs text-green-600 mt-1">✓ Phrase confirmed</p>
                )}
              </div>
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => closeModal("deleteAccount")}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccountSubmit}
                disabled={formData.deleteAccount.confirmationPhrase !== "I want to delete my account"}
                className="flex-1 bg-red-600 text-white py-2.5 font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Settings;

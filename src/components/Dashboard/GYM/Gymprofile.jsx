import NavBarDashGym from "./NavBarDashGym";
import FooterDash from "../FooterDash";
import { Lock, CreditCard, LogOut, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const Gymprofile = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  // State management
  const [trainerData, setTrainerData] = useState({
    name: "Iron Beast Gym",
    email: "info@ironbeastgym.com",
    location: "Nasr City, Cairo, Egypt",
    phone: "+20 100 987 6543",
    job: "Gym & Fitness Center",
    joined: "Opened 2020",
    level: "All Levels",
    city: "Cairo",
    goal: "Help members build strength, lose fat, and stay healthy",
    avatar:
      "https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=300",
    bio: "We are a full-service gym specializing in strength training, fat loss, and functional fitness. Our mission is to help you reach your best shape with effective workouts and a motivating environment.",
    skills: [
      "Strength training area",
      "Cardio machines",
      "CrossFit & functional zone",
      "Personal training sessions",
      "Group classes (HIIT, Zumba, Boxing)",
    ],
    linkedin: "linkedin.com/company/ironbeastgym",
  });

  const [modals, setModals] = useState({
    editProfile: false,
    changePassword: false,
    paymentInfo: false,
  });

  const [formData, setFormData] = useState({
    editProfile: {
      ...trainerData,
      skills: Array.isArray(trainerData.skills)
        ? trainerData.skills.join(", ")
        : trainerData.skills,
    },
    changePassword: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    paymentInfo: { cardNumber: "", expiryDate: "", cvv: "", cardHolder: "" },
  });

  // Modal handlers
  const openModal = (modalName) => {
    if (modalName === "editProfile") {
      setFormData((prev) => ({
        ...prev,
        editProfile: {
          ...trainerData,
          skills: Array.isArray(trainerData.skills)
            ? trainerData.skills.join(", ")
            : trainerData.skills,
        },
      }));
    }

    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  // Edit Profile handlers
  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      editProfile: { ...prev.editProfile, [name]: value },
    }));
  };

  // Avatar upload (reads file as data URL and sets preview in form)
  const handleAvatarUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        editProfile: {
          ...prev.editProfile,
          avatar: reader.result,
          avatarFile: file,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    const updated = { ...formData.editProfile };
    if (typeof updated.skills === "string") {
      updated.skills = updated.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    setTrainerData(updated);
    closeModal("editProfile");
    showToast("Profile updated successfully!", { type: "success" });
  };

  // Change Password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      changePassword: { ...prev.changePassword, [name]: value },
    }));
  };

  const handleSavePassword = () => {
    if (
      formData.changePassword.newPassword !==
      formData.changePassword.confirmPassword
    ) {
      showToast("New passwords do not match!", { type: "error" });
      return;
    }
    closeModal("changePassword");
    showToast("Password changed successfully!", { type: "success" });
    setFormData((prev) => ({
      ...prev,
      changePassword: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    }));
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

  // Logout handler
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  return (
    <>
      <NavBarDashGym />

      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 text-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* PERSONAL INFORMATION SECTION */}
          <section className="mb-10">
            <div className="bg-white border border-orange-100 rounded-3xl p-6 md:p-8 shadow-[0_14px_45px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#ff8211] via-amber-300 to-yellow-200 opacity-80 blur-md" />
                    <img
                      src={trainerData.avatar}
                      alt={trainerData.name}
                      className="relative w-40 h-40 rounded-full object-cover border-[3px] border-white shadow-xl"
                    />
                  </div>
                </div>

                {/* Personal Info */}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <h2 className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-slate-500">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-[#ff8211] text-lg">
                        👤
                      </span>
                      Personal Information
                    </h2>

                    <button
                      onClick={() => openModal("editProfile")}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff8211] to-amber-400 px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-wide text-white shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all"
                    >
                      <span className="text-base">✎</span>
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
                    <div className="bg-orange-50/60 border border-orange-100 rounded-2xl px-4 py-3">
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Name
                      </p>
                      <p className="text-sm md:text-base text-slate-900 font-semibold">
                        {trainerData.name}
                      </p>
                    </div>
                    <div className="bg-orange-50/60 border border-orange-100 rounded-2xl px-4 py-3">
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Location
                      </p>
                      <p className="text-sm md:text-base text-slate-900">
                        {trainerData.location}
                      </p>
                    </div>
                    <div className="bg-orange-50/60 border border-orange-100 rounded-2xl px-4 py-3">
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Email
                      </p>
                      <p className="text-sm md:text-base text-slate-900 break-all">
                        {trainerData.email}
                      </p>
                    </div>
                    <div className="bg-orange-50/60 border border-orange-100 rounded-2xl px-4 py-3">
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Phone
                      </p>
                      <p className="text-sm md:text-base text-slate-900">
                        {trainerData.phone}
                      </p>
                    </div>
                    <div className="bg-orange-50/60 border border-orange-100 rounded-2xl px-4 py-3 md:col-span-2">
                      <p className="text-xs text-slate-500 font-medium uppercase">
                        Type
                      </p>
                      <p className="text-sm md:text-base text-slate-900">
                        {trainerData.job}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROFESSIONAL DETAILS SECTION */}
          <section className="mb-10">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[0_14px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold uppercase tracking-wide text-slate-900">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-50 text-[#ff8211]">
                    💼
                  </span>
                  Professional Details
                </h2>
                <span className="hidden md:inline-flex text-xs px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 tracking-wide uppercase">
                  Since {trainerData.joined}
                </span>
              </div>

              <div className="space-y-5">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4">
                  <p className="text-xs text-slate-500 font-medium uppercase mb-1">
                    Bio
                  </p>
                  <p className="text-sm md:text-base text-slate-800 leading-relaxed">
                    {trainerData.bio}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4">
                  <p className="text-xs text-slate-500 font-medium uppercase mb-2">
                    Facilities & Services
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trainerData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs md:text-sm text-slate-800 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4">
                  <p className="text-xs text-slate-500 font-medium uppercase mb-1">
                    LinkedIn
                  </p>
                  <a
                    href={`https://${trainerData.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm md:text-base text-[#ff8211] hover:text-[#ff9b3a] underline underline-offset-4 decoration-[#ff8211]/60"
                  >
                    {trainerData.linkedin}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* SETTINGS SECTION */}
          <section>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[0_14px_45px_rgba(15,23,42,0.08)]">
              <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold uppercase tracking-wide text-slate-900 mb-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-50 text-[#ff8211]">
                  ⚙️
                </span>
                Settings
              </h2>

              <div className="space-y-3">
                {/* Change Password */}
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 hover:bg-orange-50/60 hover:border-orange-200 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 group-hover:border-[#ff8211]/60 group-hover:text-[#ff8211] transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <button
                      onClick={() => openModal("changePassword")}
                      className="text-sm md:text-base text-slate-800 font-semibold group-hover:text-slate-900 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
                    Secure your account
                  </span>
                </div>

                {/* Payment Info */}
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 hover:bg-orange-50/60 hover:border-orange-200 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 group-hover:border-[#ff8211]/60 group-hover:text-[#ff8211] transition-colors">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <button
                      onClick={() => openModal("paymentInfo")}
                      className="text-sm md:text-base text-slate-800 font-semibold group-hover:text-slate-900 transition-colors"
                    >
                      Payment Info
                    </button>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
                    Manage billing
                  </span>
                </div>

                {/* Logout */}
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 hover:bg-red-100 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-700 group-hover:bg-red-200 group-hover:text-red-800 transition-colors">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-sm md:text-base text-red-700 font-semibold group-hover:text-red-800 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                  <span className="text-xs text-red-500/80 group-hover:text-red-700 transition-colors">
                    Sign out safely
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* EDIT PROFILE MODAL */}
      {modals.editProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-100 shadow-2xl rounded-3xl overflow-hidden max-h-[80vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-orange-50/70">
              <h2 className="text-lg font-semibold text-slate-900">
                Edit Profile
              </h2>
              <button
                onClick={() => closeModal("editProfile")}
                className="p-1 rounded-full hover:bg-orange-100 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Avatar preview + quick info */}
            {formData.editProfile?.avatar && (
              <div className="px-6 pt-4 pb-2 flex items-center gap-4">
                <img
                  src={formData.editProfile.avatar}
                  alt="avatar preview"
                  className="w-16 h-16 rounded-full object-cover border border-slate-200 shadow-md"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.editProfile.name}
                  </p>
                  <p className="text-xs text-slate-500">Preview</p>
                </div>
              </div>
            )}

            <div className="px-6 py-5 space-y-4 overflow-y-auto max-h-[56vh]">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.editProfile.name}
                  onChange={handleEditProfileChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.editProfile.email}
                  onChange={handleEditProfileChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.editProfile.location}
                  onChange={handleEditProfileChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.editProfile.phone}
                  onChange={handleEditProfileChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Job
                </label>
                <input
                  type="text"
                  name="job"
                  value={formData.editProfile.job}
                  onChange={handleEditProfileChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="w-full text-sm bg-white border border-dashed border-slate-300 cursor-pointer rounded-xl px-3 py-2 text-slate-600 outline-none focus:border-[#FF8A1A] hover:bg-orange-50/60 transition-colors"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Select an image from your device
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.editProfile.skills}
                  onChange={handleEditProfileChange}
                  placeholder="Strength area, Cardio zone, ..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  LinkedIn
                </label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.editProfile.linkedin}
                  onChange={handleEditProfileChange}
                  placeholder="linkedin.com/company/your-gym"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.editProfile.bio}
                  onChange={handleEditProfileChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                  rows="3"
                />
              </div>
            </div>

            <div className="px-6 pb-5 pt-3 flex gap-3 bg-slate-50 border-t border-slate-100 sticky bottom-0">
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-gradient-to-r from-[#FF8A1A] to-amber-400 text-white py-2.5 text-sm font-semibold rounded-full hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all"
              >
                Save Changes
              </button>
              <button
                onClick={() => closeModal("editProfile")}
                className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 text-sm font-semibold rounded-full hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {modals.changePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-100 shadow-2xl rounded-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-orange-50/70">
              <h2 className="text-lg font-semibold text-slate-900">
                Change Password
              </h2>
              <button
                onClick={() => closeModal("changePassword")}
                className="p-1 rounded-full hover:bg-orange-100 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.changePassword.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.changePassword.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.changePassword.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
            </div>

            <div className="px-6 pb-5 pt-3 flex gap-3 bg-slate-50 border-t border-slate-100">
              <button
                onClick={handleSavePassword}
                className="flex-1 bg-gradient-to-r from-[#FF8A1A] to-amber-400 text-white py-2.5 text-sm font-semibold rounded-full hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all"
              >
                Change Password
              </button>
              <button
                onClick={() => closeModal("changePassword")}
                className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 text-sm font-semibold rounded-full hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT INFO MODAL */}
      {modals.paymentInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white border border-slate-100 shadow-2xl rounded-3xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-orange-50/70">
              <h2 className="text-lg font-semibold text-slate-900">
                Payment Information
              </h2>
              <button
                onClick={() => closeModal("paymentInfo")}
                className="p-1 rounded-full hover:bg-orange-100 text-slate-500 hover:text-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={formData.paymentInfo.cardHolder}
                  onChange={handlePaymentChange}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-800">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-slate-800">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#FF8A1A] focus:ring-1 focus:ring-[#FF8A1A]"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 pb-5 pt-3 flex gap-3 bg-slate-50 border-t border-slate-100">
              <button
                onClick={handleSavePayment}
                className="flex-1 bg-gradient-to-r from-[#FF8A1A] to-amber-400 text-white py-2.5 text-sm font-semibold rounded-full hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all"
              >
                Save Payment
              </button>
              <button
                onClick={() => closeModal("paymentInfo")}
                className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 text-sm font-semibold rounded-full hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterDash />
    </>
  );
};

export default Gymprofile;

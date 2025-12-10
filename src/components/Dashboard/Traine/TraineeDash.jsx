import { useState } from "react";
import NavTraineeDash from "./NavTraineDash";
import FooterDash from "../FooterDash";
import { useToast } from "../../../context/ToastContext";
import {
  User,
  TrendingUp,
  Activity,
  Target,
  Plus,
  Edit,
  BarChart3,
  Calendar,
  Bell,
  Dumbbell,
  X,
  Save,
  Trash2,
  Upload,
  Camera,
  Award,
  TrendingDown,
  ChevronDown,
  ChevronUp,
  MapPin,
  Mail,
  Phone,
  Briefcase
} from "lucide-react";

// Helper component for BriefcaseIcon
const BriefcaseIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const TraineeDash = () => {
  const { showToast } = useToast();

  // State Management
  const [selectedTimeRange, setSelectedTimeRange] = useState("30days");
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);

  const [progressRecords, setProgressRecords] = useState([
    { id: 1, date: "2024-12-01", weight: 75.5, height: 175, bodyFat: 18.2, muscleMass: 61.8, bmr: 1720 },
    { id: 2, date: "2024-11-24", weight: 76.2, height: 175, bodyFat: 18.8, muscleMass: 61.2, bmr: 1710 },
    { id: 3, date: "2024-11-17", weight: 76.8, height: 175, bodyFat: 19.2, muscleMass: 60.9, bmr: 1705 },
    { id: 4, date: "2024-11-10", weight: 77.3, height: 175, bodyFat: 19.6, muscleMass: 60.5, bmr: 1700 },
    { id: 5, date: "2024-11-03", weight: 77.9, height: 175, bodyFat: 20.1, muscleMass: 60.1, bmr: 1695 },
  ]);

  // Load logged-in user data from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Merged User State (combining logged-in user data with default UI values)
  const [user, setUser] = useState({
    name: loggedInUser?.username ||
      (loggedInUser?.first_name && loggedInUser?.last_name
        ? `${loggedInUser.first_name} ${loggedInUser.last_name}`
        : (loggedInUser?.email?.split('@')[0] || "User")),
    email: loggedInUser?.email || "",
    location: loggedInUser?.location || "",
    phone: loggedInUser?.phone || "",
    job: loggedInUser?.job || "Trainee",
    joined: loggedInUser?.joined || "Recently",
    level: loggedInUser?.level || "Beginner",
    city: loggedInUser?.city || "",
    goal: loggedInUser?.goal || "",
    avatar: loggedInUser?.avatar || loggedInUser?.profile_picture || "",
    bio: loggedInUser?.bio || "",
    skills: loggedInUser?.skills || [],
    linkedin: loggedInUser?.linkedin || "",
    membershipStatus: loggedInUser?.membership_status || "Free Member",
    workoutsCompleted: loggedInUser?.workoutsCompleted || 0,
    currentWeight: loggedInUser?.currentWeight || 0,
    bodyFat: loggedInUser?.bodyFat || 0,
    muscleMass: loggedInUser?.muscleMass || 0,
    memberSince: loggedInUser?.created_at ? new Date(loggedInUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
    birthdate: loggedInUser?.birthdate || "",
    state: loggedInUser?.state || "",
    zip: loggedInUser?.zip || ""
  });

  // Edit Profile State
  const [editedUser, setEditedUser] = useState({
    ...user,
    skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills
  });

  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editedRecord, setEditedRecord] = useState({});

  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: "",
    height: "",
    bodyFat: "",
    muscleMass: "",
    bmr: ""
  });

  const [upcomingSessions, setUpcomingSessions] = useState([
    { id: 1, date: "Dec 2", time: "10:00 AM", activity: "Strength Training", trainer: "Coach Sarah" },
    { id: 2, date: "Dec 4", time: "3:00 PM", activity: "HIIT Cardio", trainer: "Coach Mike" },
    { id: 3, date: "Dec 6", time: "9:00 AM", activity: "Yoga & Mobility", trainer: "Coach Lisa" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: "reminder", message: "Your next session is tomorrow at 10:00 AM", read: false },
    { id: 2, type: "achievement", message: "You've completed 24 workouts this month! 🎉", read: false },
  ]);

  // Filter records based on time range
  const getFilteredRecords = () => {
    const now = new Date();
    const daysMap = { "7days": 7, "30days": 30, "90days": 90 };
    const days = daysMap[selectedTimeRange];

    return progressRecords.filter(record => {
      const recordDate = new Date(record.date);
      const diffTime = Math.abs(now - recordDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= days;
    });
  };

  // Add new record
  const handleAddRecord = (e) => {
    e.preventDefault();
    const record = {
      id: progressRecords.length + 1,
      ...newRecord,
      weight: parseFloat(newRecord.weight),
      height: parseFloat(newRecord.height),
      bodyFat: parseFloat(newRecord.bodyFat),
      muscleMass: parseFloat(newRecord.muscleMass),
      bmr: parseInt(newRecord.bmr)
    };

    setProgressRecords([record, ...progressRecords]);

    // Update user stats
    setUser(prev => ({
      ...prev,
      currentWeight: record.weight,
      bodyFat: record.bodyFat,
      muscleMass: record.muscleMass
    }));

    // Reset form and close modal
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      weight: "",
      height: "",
      bodyFat: "",
      muscleMass: "",
      bmr: ""
    });
    setShowAddRecordModal(false);

    // Add success notification
    addNotification("achievement", "New record added successfully! 📊");
  };

  // Delete record
  const handleDeleteRecord = (id) => {
    setProgressRecords(progressRecords.filter(record => record.id !== id));
    addNotification("reminder", "Record deleted");
  };

  // Add notification
  const addNotification = (type, message) => {
    const newNotif = {
      id: notifications.length + 1,
      type,
      message,
      read: false
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save profile
  const handleSaveProfile = () => {
    // Normalize skills input (allow comma separated string)
    const updated = { ...editedUser };
    if (typeof updated.skills === "string") {
      updated.skills = updated.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    setUser(updated);
    setShowEditProfileModal(false);
    showToast("Profile updated successfully!", { type: "success" });
  };

  // Handle cancel edit profile
  const handleCancelEditProfile = () => {
    setEditedUser({
      ...user,
      skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills
    });
    setShowEditProfileModal(false);
  };

  // Handle edit record
  const handleEditRecord = (record) => {
    setEditingRecordId(record.id);
    setEditedRecord({ ...record });
  };

  // Handle save edited record
  const handleSaveEditedRecord = () => {
    // Update the progress records
    const updatedRecords = progressRecords.map(record =>
      record.id === editingRecordId ? { ...record, ...editedRecord } : record
    );
    setProgressRecords(updatedRecords);

    // If the edited record is the most recent one (first in array), update user stats
    const editedRecordData = updatedRecords.find(r => r.id === editingRecordId);
    const mostRecentRecord = updatedRecords[0]; // Assuming records are sorted by date, most recent first

    if (editedRecordData && editedRecordData.id === mostRecentRecord.id) {
      setUser(prev => ({
        ...prev,
        currentWeight: editedRecordData.weight,
        bodyFat: editedRecordData.bodyFat,
        muscleMass: editedRecordData.muscleMass
      }));
    }

    // Clear editing state
    setEditingRecordId(null);
    setEditedRecord({});

    // Show success notification
    addNotification("achievement", "Record updated successfully! 📊");
  };

  // Handle cancel edit record
  const handleCancelEditRecord = () => {
    setEditingRecordId(null);
    setEditedRecord({});
  };

  const filteredRecords = getFilteredRecords();

  return (
    <>
      <NavTraineeDash />
      <main className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Animated Dropdown Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden hover:shadow-md transition-shadow">
            {/* Collapsed Header - Always Visible */}
            <div
              className="flex items-center justify-between p-6 cursor-pointer"
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff8211] to-[#ff9a42] flex items-center justify-center overflow-hidden ring-4 ring-orange-50">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#ff8211] to-[#ff9a42] text-white rounded-lg text-xs font-semibold shadow-sm">
                      <Award className="w-3 h-3" />
                      {user.membershipStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Toggle Icon */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                {isHeaderExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            {/* Expanded Content - Animated */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${isHeaderExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                {/* Membership Info */}
                <div className="mt-6 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-[#ff8211]" />
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Membership Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Member Since</p>
                        <p className="text-sm text-gray-900 font-semibold">{user.memberSince}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Award className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Level</p>
                        <p className="text-sm text-gray-900 font-semibold">{user.level}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-[#ff8211]" />
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Personal Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Email</p>
                        <p className="text-sm text-gray-900 font-semibold">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Phone className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                        <p className="text-sm text-gray-900 font-semibold">{user.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Location</p>
                        <p className="text-sm text-gray-900 font-semibold">{user.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Job</p>
                        <p className="text-sm text-gray-900 font-semibold">{user.job}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BriefcaseIcon className="w-5 h-5 text-[#ff8211]" />
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Professional Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                      <p className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Bio</p>
                      <p className="text-sm text-gray-800 leading-relaxed">{user.bio}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-2 uppercase tracking-wide">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 text-[#ff8211] rounded-lg text-sm font-semibold border border-orange-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">LinkedIn</p>
                      <a href={`https://${user.linkedin}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">
                        {user.linkedin}
                      </a>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <p className="text-xs text-gray-600 font-semibold mb-1 uppercase tracking-wide">Goal</p>
                      <p className="text-sm text-gray-800 font-medium">{user.goal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Workouts Completed */}
            <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Dumbbell className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+4</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-semibold mb-2">Workouts Completed</h3>
              <p className="text-4xl font-bold text-gray-900">{user.workoutsCompleted}</p>
              <p className="text-xs text-gray-500 mt-2">This week</p>
            </div>

            {/* Weight */}
            <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-7 h-7 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingDown className="w-4 h-4" />
                  <span>-2.4</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-semibold mb-2">Current Weight</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-gray-900">{user.currentWeight}</p>
                <span className="text-lg text-gray-500 font-medium">kg</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>

            {/* Body Fat */}
            <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingDown className="w-4 h-4" />
                  <span>-1.9</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-semibold mb-2">Body Fat</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-gray-900">{user.bodyFat}</p>
                <span className="text-lg text-gray-500 font-medium">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>

            {/* Muscle Mass */}
            <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-green-200 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+1.7</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-semibold mb-2">Muscle Mass</h3>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-gray-900">{user.muscleMass}</p>
                <span className="text-lg text-gray-500 font-medium">kg</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">This month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Section - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Records</h2>
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ff8211] focus:border-transparent hover:border-gray-300 transition-colors"
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="90days">Last 90 Days</option>
                  </select>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Weight (kg)</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Height (cm)</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Body Fat %</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Muscle (kg)</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">BMR</th>
                        <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-4 text-sm text-gray-600 font-medium">{record.date}</td>
                          <td className="py-4 px-4 text-sm text-gray-900 font-bold">{record.weight}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{record.height}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{record.bodyFat}%</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{record.muscleMass}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{record.bmr}</td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => handleDeleteRecord(record.id)}
                              className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                              aria-label="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weight Progress Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-purple-600" />
                    Weight Progress
                  </h3>
                  <div className="h-52 flex items-end justify-between gap-2">
                    {[...filteredRecords].reverse().map((record, index) => {
                      const maxWeight = 80;
                      const minWeight = 74;
                      const height = ((record.weight - minWeight) / (maxWeight - minWeight)) * 100;

                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                          <div className="text-xs text-gray-700 font-bold">{record.weight}</div>
                          <div
                            className="w-full bg-gradient-to-t from-purple-500 via-purple-400 to-purple-300 rounded-t-xl transition-all hover:opacity-90 cursor-pointer shadow-sm"
                            style={{ height: `${height}%` }}
                            title={`${record.date}: ${record.weight}kg`}
                          ></div>
                          <div className="text-xs text-gray-500 font-medium">{record.date.slice(5)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Body Composition Chart */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    Body Composition
                  </h3>
                  <div className="h-52 flex items-end justify-around gap-6">
                    {/* Muscle Mass Bar */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs text-gray-700 font-bold">{user.muscleMass} kg</div>
                      <div
                        className="w-full bg-gradient-to-t from-green-600 via-green-500 to-green-400 rounded-t-xl cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                        style={{ height: '80%' }}
                        title={`Muscle Mass: ${user.muscleMass}kg`}
                      ></div>
                      <div className="text-xs text-gray-600 font-bold">Muscle</div>
                    </div>

                    {/* Body Fat Bar */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs text-gray-700 font-bold">{user.bodyFat}%</div>
                      <div
                        className="w-full bg-gradient-to-t from-orange-600 via-orange-500 to-orange-400 rounded-t-xl cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                        style={{ height: '35%' }}
                        title={`Body Fat: ${user.bodyFat}%`}
                      ></div>
                      <div className="text-xs text-gray-600 font-bold">Fat</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Schedule - Takes 1 column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowAddRecordModal(true)}
                    className="group w-full flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#ff8211] to-[#ff9a42] text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span>Add Record</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditedUser({
                        ...user,
                        skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills
                      });
                      setShowEditProfileModal(true);
                    }}
                    className="group w-full flex items-center gap-3 px-4 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-[#ff8211] hover:bg-orange-50 hover:scale-[1.02] transition-all font-medium"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <Edit className="w-5 h-5 group-hover:text-[#ff8211]" />
                    </div>
                    <span>Edit Profile</span>
                  </button>
                  <button className="group w-full flex items-center gap-3 px-4 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-[#ff8211] hover:bg-orange-50 hover:scale-[1.02] transition-all font-medium">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                      <BarChart3 className="w-5 h-5 group-hover:text-[#ff8211]" />
                    </div>
                    <span>View Detailed Graphs</span>
                  </button>
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
                </div>
                <div className="space-y-3">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="group p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-900 text-sm mb-1">{session.activity}</p>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {session.trainer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mt-2 pt-2 border-t border-gray-100">
                        <Calendar className="w-3 h-3" />
                        <span>{session.date}</span>
                        <span>•</span>
                        <span>{session.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                </div>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-xl border-2 relative transition-all ${notification.type === 'achievement'
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
                        : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300'
                        } ${notification.read ? 'opacity-60' : 'shadow-sm'}`}
                    >
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="absolute top-3 right-3 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-colors"
                        aria-label="Delete notification"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-sm text-gray-700 font-medium pr-8 leading-relaxed">{notification.message}</p>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800 mt-2 hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Record Modal */}
        {showAddRecordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Record</h2>
                <button
                  onClick={() => setShowAddRecordModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddRecord} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRecord.weight}
                    onChange={(e) => setNewRecord({ ...newRecord, weight: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={newRecord.height}
                    onChange={(e) => setNewRecord({ ...newRecord, height: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body Fat (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRecord.bodyFat}
                    onChange={(e) => setNewRecord({ ...newRecord, bodyFat: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Muscle Mass (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRecord.muscleMass}
                    onChange={(e) => setNewRecord({ ...newRecord, muscleMass: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BMR</label>
                  <input
                    type="number"
                    value={newRecord.bmr}
                    onChange={(e) => setNewRecord({ ...newRecord, bmr: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddRecordModal(false)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-[#ff8211] to-[#ff9a42] text-white rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">
              <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                  <button
                    onClick={handleCancelEditProfile}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Profile Picture Section */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-[#ff8211]" />
                    Profile Picture
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff8211] to-[#ff9a42] flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                        {editedUser.avatar ? (
                          <img src={editedUser.avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-12 h-12 text-white" />
                        )}
                      </div>
                      <label className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-shadow border-2 border-[#ff8211]">
                        <Upload className="w-4 h-4 text-[#ff8211]" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Upload a new profile picture</p>
                      <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Basic Info Section */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editedUser.name || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editedUser.email || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editedUser.phone || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={editedUser.location || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                        placeholder="Enter location"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job</label>
                      <input
                        type="text"
                        value={editedUser.job || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, job: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                        placeholder="Enter job"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={editedUser.city || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                        placeholder="Enter city"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Details Section */}
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BriefcaseIcon className="w-5 h-5 text-purple-600" />
                    Professional Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={editedUser.bio || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                      <input
                        type="text"
                        value={editedUser.skills || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, skills: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                        placeholder="React, Node, CSS"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={editedUser.linkedin || ""}
                        onChange={(e) => setEditedUser({ ...editedUser, linkedin: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff8211] focus:border-transparent"
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 flex gap-3 bg-white sticky bottom-0 border-t border-gray-100 pt-4">
                <button
                  onClick={handleCancelEditProfile}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#ff8211] to-[#ff9a42] text-white rounded-lg hover:shadow-lg transition-shadow"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <FooterDash />
      </main>
    </>
  );
};


export default TraineeDash;

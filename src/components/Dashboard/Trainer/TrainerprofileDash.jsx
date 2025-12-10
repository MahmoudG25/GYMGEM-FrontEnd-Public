import NavBarDash from "./NavBarDash";
import FooterDash from "../FooterDash";
import {
  Edit, Trash2, Plus, X, Save,
  MapPin, Phone, Mail, Calendar,
  Briefcase, Award, Activity, TrendingUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const TrainerProfileDash = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [modals, setModals] = useState({
    editProfile: false,
    addSpecialization: false,
    editSpecialization: false,
    addExperience: false,
    editExperience: false,
    addRecord: false,
    editRecord: false
  });

  // Initialize state from localStorage with merge logic
  const [profileData, setProfileData] = useState(() => {
    // 1. Get the currently logged-in user (Source of Truth for identity)
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Construct display name from user object
    let displayName = "Trainer";
    if (user.first_name && user.last_name) {
      displayName = `${user.first_name} ${user.last_name}`;
    } else if (user.first_name) {
      displayName = user.first_name;
    } else if (user.username) {
      displayName = user.username;
    } else if (user.email) {
      displayName = user.email.split("@")[0];
    }

    // Create a fresh profile object from the user data
    const freshProfile = {
      avatar: user.avatar || "https://i.pravatar.cc/150?img=3",
      name: displayName,
      gender: user.gender || "Not Specified",
      birthdate: user.birth_date || "1990-01-01",
      phone: user.phone_number || "+20 100 0000000",
      country: user.country || "Egypt",
      state: user.city || "Cairo",
      zip: "12345",
      bio: user.bio || "I'm a professional trainer ready to help you achieve your goals.",
      skills: ["Fitness", "Nutrition", "Coaching"],
      linkedin: "linkedin.com/in/trainer",
      email: user.email || "trainer@example.com"
    };

    // 2. Get saved profile data (which might contain stale "Mahmoud Gado" data)
    const savedString = localStorage.getItem("trainerProfileData");
    let initialData = null;

    if (savedString) {
      try {
        initialData = JSON.parse(savedString);
      } catch (e) {
        console.error("Error parsing saved profile data", e);
      }
    }

    // 3. Merge logic
    if (initialData) {
      // If the saved data has the dummy name "Mahmoud Gado" but the real user is different,
      // we should probably trust the fresh profile completely for identity fields.
      return {
        ...initialData,
        profile: {
          ...initialData.profile, // Keep existing fields (like zip, skills)
          ...freshProfile,        // Overwrite identity fields (name, email, phone, etc.) with real user data
          // Explicitly overwrite name if it was the dummy one
          name: (initialData.profile.name === "Mahmoud Gado" && displayName !== "Trainer")
            ? displayName
            : (initialData.profile.name || displayName)
        }
      };
    }

    // 4. No saved data? Return fresh default
    return {
      profile: freshProfile,
      specializations: [],
      workExperience: [],
      records: []
    };
  });

  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState({});

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("trainerProfileData", JSON.stringify(profileData));
    // Also update the legacy trainerProfile for backward compatibility
    localStorage.setItem("trainerProfile", JSON.stringify(profileData.profile));
  }, [profileData]);

  // Modal handlers
  const openModal = (modalName, data = null) => {
    setCurrentEdit(data);
    if (modalName === "editProfile") {
      setFormData({ ...profileData.profile });
    } else if (data) {
      setFormData({ ...data });
    } else {
      setFormData({});
    }
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setCurrentEdit(null);
    setFormData({});
  };

  // Avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Profile handlers
  const handleSaveProfile = () => {
    setProfileData(prev => ({ ...prev, profile: formData }));
    closeModal("editProfile");
    showToast("Profile updated successfully!", { type: "success" });
  };

  // Specialization handlers
  const handleSaveSpecialization = () => {
    if (currentEdit) {
      setProfileData(prev => ({
        ...prev,
        specializations: prev.specializations.map(s =>
          s.id === currentEdit.id ? { ...formData, id: s.id } : s
        )
      }));
      showToast("Specialization updated!", { type: "success" });
    } else {
      setProfileData(prev => ({
        ...prev,
        specializations: [...prev.specializations, { ...formData, id: Date.now() }]
      }));
      showToast("Specialization added!", { type: "success" });
    }
    closeModal(currentEdit ? "editSpecialization" : "addSpecialization");
  };

  const handleDeleteSpecialization = (id) => {
    if (window.confirm("Delete this specialization?")) {
      setProfileData(prev => ({
        ...prev,
        specializations: prev.specializations.filter(s => s.id !== id)
      }));
      showToast("Specialization deleted!", { type: "success" });
    }
  };

  // Experience handlers
  const handleSaveExperience = () => {
    if (currentEdit) {
      setProfileData(prev => ({
        ...prev,
        workExperience: prev.workExperience.map(e =>
          e.id === currentEdit.id ? { ...formData, id: e.id } : e
        )
      }));
      showToast("Experience updated!", { type: "success" });
    } else {
      setProfileData(prev => ({
        ...prev,
        workExperience: [...prev.workExperience, { ...formData, id: Date.now() }]
      }));
      showToast("Experience added!", { type: "success" });
    }
    closeModal(currentEdit ? "editExperience" : "addExperience");
  };

  const handleDeleteExperience = (id) => {
    if (window.confirm("Delete this experience?")) {
      setProfileData(prev => ({
        ...prev,
        workExperience: prev.workExperience.filter(e => e.id !== id)
      }));
      showToast("Experience deleted!", { type: "success" });
    }
  };

  // Record handlers
  const handleSaveRecord = () => {
    if (currentEdit) {
      setProfileData(prev => ({
        ...prev,
        records: prev.records.map(r =>
          r.id === currentEdit.id ? { ...formData, id: r.id } : r
        )
      }));
      showToast("Record updated!", { type: "success" });
    } else {
      setProfileData(prev => ({
        ...prev,
        records: [...prev.records, { ...formData, id: Date.now() }]
      }));
      showToast("Record added!", { type: "success" });
    }
    closeModal(currentEdit ? "editRecord" : "addRecord");
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm("Delete this record?")) {
      setProfileData(prev => ({
        ...prev,
        records: prev.records.filter(r => r.id !== id)
      }));
      showToast("Record deleted!", { type: "success" });
    }
  };

  const { profile } = profileData;

  return (
    <>
      <NavBarDash />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground bebas-regular">
                      {profile.name}
                    </h1>
                    <p className="text-muted-foreground poppins-regular">
                      Personal Trainer
                    </p>
                  </div>
                  <button
                    onClick={() => openModal("editProfile")}
                    className="px-4 py-2 bg-[#FF8211] text-white rounded-lg hover:bg-[#ff7906] transition-colors poppins-medium text-sm flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Gender: {profile.gender}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Birthdate: {profile.birthdate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.country}, {profile.state} {profile.zip}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specializations & Services */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground bebas-regular flex items-center gap-2">
                <Award className="w-6 h-6 text-[#FF8211]" />
                Specializations & Services
              </h2>
              <button
                onClick={() => openModal("addSpecialization")}
                className="px-4 py-2 bg-[#FF8211] text-white rounded-lg hover:bg-[#ff7906] transition-colors poppins-medium text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Specialization
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.specializations.map(spec => (
                <div key={spec.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-foreground poppins-medium">
                      {spec.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("editSpecialization", spec)}
                        className="text-[#FF8211] hover:text-[#ff7906] p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSpecialization(spec.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground poppins-regular">
                    <p>Experience: {spec.yearsExperience} years</p>
                    <p>Rate: ${spec.hourlyRate}/hour</p>
                    <p>Location: {spec.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground bebas-regular flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-[#FF8211]" />
                Work Experience
              </h2>
              <button
                onClick={() => openModal("addExperience")}
                className="px-4 py-2 bg-[#FF8211] text-white rounded-lg hover:bg-[#ff7906] transition-colors poppins-medium text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {profileData.workExperience.map(exp => (
                <div key={exp.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-foreground poppins-medium">
                        {exp.position}
                      </h3>
                      <p className="text-[#FF8211] poppins-regular">{exp.workplace}</p>
                      <p className="text-sm text-muted-foreground poppins-regular">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("editExperience", exp)}
                        className="text-[#FF8211] hover:text-[#ff7906] p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground poppins-regular">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trainer Records */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground bebas-regular flex items-center gap-2">
                <Activity className="w-6 h-6 text-[#FF8211]" />
                Body Measurements
              </h2>
              <button
                onClick={() => openModal("addRecord")}
                className="px-4 py-2 bg-[#FF8211] text-white rounded-lg hover:bg-[#ff7906] transition-colors poppins-medium text-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Record
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 poppins-medium">Date</th>
                    <th className="text-left p-3 poppins-medium">Weight</th>
                    <th className="text-left p-3 poppins-medium">Height</th>
                    <th className="text-left p-3 poppins-medium">Body Fat</th>
                    <th className="text-left p-3 poppins-medium">Muscle</th>
                    <th className="text-left p-3 poppins-medium">BMR</th>
                    <th className="text-left p-3 poppins-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profileData.records.map(record => (
                    <tr key={record.id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3 poppins-regular">{record.date}</td>
                      <td className="p-3 poppins-regular">{record.weight} kg</td>
                      <td className="p-3 poppins-regular">{record.height} cm</td>
                      <td className="p-3 poppins-regular">{record.bodyFat}%</td>
                      <td className="p-3 poppins-regular">{record.muscleMass} kg</td>
                      <td className="p-3 poppins-regular">{record.bmr}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal("editRecord", record)}
                            className="text-[#FF8211] hover:text-[#ff7906] p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord(record.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {modals.editProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Edit Profile</h3>
              <button onClick={() => closeModal("editProfile")} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Profile Picture</label>
                {formData.avatar && (
                  <img src={formData.avatar} alt="Preview" className="w-24 h-24 rounded-full mb-2" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="w-full text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select
                    value={formData.gender || ""}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Birthdate</label>
                  <input
                    type="date"
                    value={formData.birthdate || ""}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country || ""}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state || ""}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zip || ""}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => closeModal("editProfile")}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-[#FF8211] text-white rounded hover:bg-[#ff7906]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Specialization Modal */}
      {(modals.addSpecialization || modals.editSpecialization) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {currentEdit ? "Edit" : "Add"} Specialization
              </h3>
              <button
                onClick={() => closeModal(currentEdit ? "editSpecialization" : "addSpecialization")}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Specialization Name</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g., Strength Training"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Years of Experience</label>
                <input
                  type="number"
                  value={formData.yearsExperience || ""}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: parseInt(e.target.value) })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
                <input
                  type="number"
                  value={formData.hourlyRate || ""}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Service Location</label>
                <select
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select...</option>
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => closeModal(currentEdit ? "editSpecialization" : "addSpecialization")}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSpecialization}
                className="px-4 py-2 bg-[#FF8211] text-white rounded hover:bg-[#ff7906]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Experience Modal */}
      {(modals.addExperience || modals.editExperience) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {currentEdit ? "Edit" : "Add"} Experience
              </h3>
              <button
                onClick={() => closeModal(currentEdit ? "editExperience" : "addExperience")}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Workplace</label>
                <input
                  type="text"
                  value={formData.workplace || ""}
                  onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <input
                  type="text"
                  value={formData.position || ""}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="month"
                    value={formData.startDate || ""}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="text"
                    value={formData.endDate || ""}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Present or YYYY-MM"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  rows="3"
                />
              </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => closeModal(currentEdit ? "editExperience" : "addExperience")}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                className="px-4 py-2 bg-[#FF8211] text-white rounded hover:bg-[#ff7906]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Record Modal */}
      {(modals.addRecord || modals.editRecord) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                {currentEdit ? "Edit" : "Add"} Body Measurement
              </h3>
              <button
                onClick={() => closeModal(currentEdit ? "editRecord" : "addRecord")}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight || ""}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height || ""}
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Body Fat (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.bodyFat || ""}
                    onChange={(e) => setFormData({ ...formData, bodyFat: parseFloat(e.target.value) })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Muscle Mass (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.muscleMass || ""}
                    onChange={(e) => setFormData({ ...formData, muscleMass: parseFloat(e.target.value) })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bone Mass (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.boneMass || ""}
                    onChange={(e) => setFormData({ ...formData, boneMass: parseFloat(e.target.value) })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Body Water (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.bodyWater || ""}
                    onChange={(e) => setFormData({ ...formData, bodyWater: parseFloat(e.target.value) })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">BMR (kcal)</label>
                  <input
                    type="number"
                    value={formData.bmr || ""}
                    onChange={(e) => setFormData({ ...formData, bmr: parseInt(e.target.value) })}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => closeModal(currentEdit ? "editRecord" : "addRecord")}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRecord}
                className="px-4 py-2 bg-[#FF8211] text-white rounded hover:bg-[#ff7906]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainerProfileDash;

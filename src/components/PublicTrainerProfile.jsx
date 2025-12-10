import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Award,
  Star,
  Book,
  ArrowRight,
  Briefcase,
  DollarSign,
  Clock,
  GraduationCap,
  Loader2,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CourseCard from "./CourseCard";

const PublicTrainerProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch Categories for mapping
    const getCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/utils/categories');
        setCategories(response.data.results);
      } catch (error) {
        console.log("Failed to load categories");
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const fetchTrainerProfile = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('access');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`http://localhost:8000/api/trainers/create?profile_id=${id}`, {
          headers
        });

        // Map API response to component state structure
        const apiData = response.data;

        // This is the structure expected by the UI populated from the API
        setProfileData({
          profile: {
            name: apiData.name,
            avatar: apiData.profile_picture || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541", // Fallback image
            email: null, // API doesn't seem to return email in the provided example, unless implied.
            country: apiData.country || "Location not specified",
            state: apiData.state || "",
            bio: apiData.bio || "No bio available for this trainer.",
            linkedin: null, // Not in provided response example
            phone: apiData.phone_number,
          },
          // API example doesn't show these lists, so initializing empty to avoid crashes.
          // If a different endpoint provides these, it should be called here.
          specializations: [],
          workExperience: [],
        });

      } catch (err) {
        console.error("Failed to fetch trainer profile:", err);
        setError("Failed to load trainer profile.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCourses = async () => {
      const token = localStorage.getItem('access');

      try {
        const response = await axios.get(`http://localhost:8000/api/courses/courses/for-trainees?trainer_profile=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        );

        const data = response.data;

        // Determine response type (Paginated vs Array)
        if (data && Array.isArray(data)) {
          setCourses(data);
        } else {
          // Unexpected format, fallback to empty
          setCourses([]);
        }

      } catch (error) {
        console.log("Failed to fetch courses");
        // Optionally handle error state
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTrainerProfile();
      fetchCourses();
    }
  }, [id]);

  // Generate category styles logic (Reused from Courses.jsx)
  const categoryOptions = [
    {
      id: "",
      name: "All Courses",
      icon: "✨",
      bgColor: "bg-muted",
      textColor: "text-muted-foreground",
      hoverColor: "hover:bg-primary/10 hover:text-primary hover:shadow-sm",
      activeColor: "bg-primary/10 text-primary shadow-sm ring-2 ring-primary/20",
    },
    ...categories.map((category, idx) => {
      const colors = [
        { bgColor: "bg-green-50", textColor: "text-green-700", hoverColor: "hover:bg-green-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-green-100 text-green-800 shadow-md ring-2 ring-green-300" },
        { bgColor: "bg-orange-50", textColor: "text-orange-700", hoverColor: "hover:bg-orange-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-orange-100 text-orange-800 shadow-md ring-2 ring-orange-300" },
        { bgColor: "bg-amber-50", textColor: "text-amber-700", hoverColor: "hover:bg-amber-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-amber-100 text-amber-800 shadow-md ring-2 ring-amber-300" },
        { bgColor: "bg-blue-50", textColor: "text-blue-700", hoverColor: "hover:bg-blue-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-blue-100 text-blue-800 shadow-md ring-2 ring-blue-300" },
        { bgColor: "bg-red-50", textColor: "text-red-700", hoverColor: "hover:bg-red-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-red-100 text-red-800 shadow-md ring-2 ring-red-300" },
        { bgColor: "bg-purple-50", textColor: "text-purple-700", hoverColor: "hover:bg-purple-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-purple-100 text-purple-800 shadow-md ring-2 ring-purple-300" },
        { bgColor: "bg-pink-50", textColor: "text-pink-700", hoverColor: "hover:bg-pink-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-pink-100 text-pink-800 shadow-md ring-2 ring-pink-300" },
        { bgColor: "bg-indigo-50", textColor: "text-indigo-700", hoverColor: "hover:bg-indigo-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-indigo-100 text-indigo-800 shadow-md ring-2 ring-indigo-300" },
        { bgColor: "bg-cyan-50", textColor: "text-cyan-700", hoverColor: "hover:bg-cyan-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-cyan-100 text-cyan-800 shadow-md ring-2 ring-cyan-300" },
        { bgColor: "bg-lime-50", textColor: "text-lime-700", hoverColor: "hover:bg-lime-100 hover:shadow-md hover:-translate-y-0.5", activeColor: "bg-lime-100 text-lime-800 shadow-md ring-2 ring-lime-300" },
      ];
      const colorScheme = colors[idx % colors.length];
      const icons = ["💪", "🏃", "🧘", "🏋️", "🧘‍♀️", "🤸", "🩹", "🧠", "🌱", "⚖️"];

      return {
        ...category,
        icon: icons[idx % icons.length],
        ...colorScheme
      };
    })
  ];

  const publishedCourses = courses.filter((c) => c.status && c.status.toLowerCase() === "published");

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#FF8211] animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !profileData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "We couldn't find the trainer you're looking for."}</p>
          <Link to="/trainers" className="px-6 py-2 bg-[#FF8211] text-white rounded-lg font-medium hover:bg-[#ff7906] transition-colors">
            Browse Trainers
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const { profile, specializations, workExperience } = profileData;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Compact Centered Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 py-12 text-center">
            {/* Avatar */}
            <div className="inline-block relative mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-[#FF8211] shadow-lg overflow-hidden bg-gray-100">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#FF8211] text-white p-2 rounded-full shadow-md">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Name & Title */}
            <h1 className="text-5xl font-bold text-gray-900 bebas-regular mb-2">
              {profile.name}
            </h1>
            <p className="text-xl text-[#FF8211] font-semibold poppins-medium mb-4">
              Personal Trainer & Fitness Expert
            </p>

            {/* Contact Info - Compact */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 poppins-regular mb-8">
              {profile.country && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FF8211]" />
                  <span>{profile.country}{profile.state ? `, ${profile.state}` : ''}</span>
                </div>
              )}
              {profile.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#FF8211]" />
                  <span>{profile.email}</span>
                </div>
              )}
            </div>

            {/* Stats Pills - Single Row */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="px-5 py-3 bg-white border-2 border-[#FF8211] rounded-full shadow-sm">
                <div className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-[#FF8211]" />
                  <span className="text-2xl font-bold text-gray-900 bebas-regular">{publishedCourses.length}</span>
                  <span className="text-sm text-gray-600 poppins-medium">Courses</span>
                </div>
              </div>
              <div className="px-5 py-3 bg-white border-2 border-[#86ac55] rounded-full shadow-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#86ac55]" />
                  <span className="text-2xl font-bold text-gray-900 bebas-regular">{specializations?.length || 0}</span>
                  <span className="text-sm text-gray-600 poppins-medium">Specializations</span>
                </div>
              </div>
              <div className="px-5 py-3 bg-white border-2 border-yellow-400 rounded-full shadow-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold text-gray-900 bebas-regular">4.9</span>
                  <span className="text-sm text-gray-600 poppins-medium">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left: Contact/Bio Card */}
            <div className="lg:col-span-1 space-y-6">

              {/* Bio Card - Moved here for better layout with limited API data */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 bebas-regular mb-4">
                  About Me
                </h2>
                <p className="text-gray-600 poppins-regular leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              {/* Contact Card */}
              {(profile.linkedin || profile.email || profile.phone) && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 bebas-regular mb-6">
                    Get In Touch
                  </h2>
                  <div className="space-y-4">
                    {profile.linkedin && (
                      <a
                        href={`https://${profile.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-[#0077b5]/10 rounded-lg flex items-center justify-center">
                          <Linkedin className="w-5 h-5 text-[#0077b5]" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 poppins-medium">LinkedIn</span>
                      </a>
                    )}
                    {profile.email && (
                      <a
                        href={`mailto:${profile.email}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-[#FF8211]/10 rounded-lg flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#FF8211]" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 poppins-medium">Email</span>
                      </a>
                    )}
                    {profile.phone && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <div className="w-10 h-10 bg-[#86ac55]/10 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-[#86ac55]" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 poppins-medium">{profile.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Content Area (Specializations & Experience) */}
            <div className="lg:col-span-2 space-y-8">

              {/* Specializations */}
              {specializations && specializations.length > 0 ? (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 bebas-regular mb-6">
                    Specializations & Services
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {specializations.map((spec, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-gray-900 poppins-semibold mb-4">
                          {spec.name}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-[#86ac55]" />
                            <span className="poppins-regular">{spec.yearsExperience} years experience</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-[#86ac55]" />
                            <span className="font-bold text-[#86ac55] poppins-semibold">${spec.hourlyRate}/hour</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="poppins-regular">{spec.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Only show this empty state if there's no bio either, otherwise it looks empty
                !profile.bio && <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
                  No additional details available.
                </div>
              )}

              {/* Work Experience */}
              {workExperience && workExperience.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 bebas-regular mb-8">
                    Work Experience
                  </h2>
                  <div className="space-y-6">
                    {workExperience.map((exp, idx) => (
                      <div key={idx} className="relative pl-10">
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#FF8211] border-4 border-white shadow" />
                        {/* Timeline Line */}
                        {idx < workExperience.length - 1 && (
                          <div className="absolute left-1.5 top-6 bottom-0 w-0.5 bg-gray-200" />
                        )}

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 poppins-semibold mb-1">
                                {exp.position}
                              </h3>
                              <p className="text-[#FF8211] font-semibold poppins-medium">
                                {exp.workplace}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 poppins-regular mt-2 sm:mt-0">
                              <Clock className="w-4 h-4" />
                              <span>{exp.startDate} - {exp.endDate}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 poppins-regular leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* My Courses - Consistent Grid */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 bebas-regular mb-8">
              My Courses
            </h2>

            {publishedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedCourses.map((course) => {
                  const theme = categoryOptions.find(opt => opt.id === course.category);
                  return (
                    <div key={course.id} className="h-full">
                      <CourseCard key={course.id || course.title} course={course} categoryTheme={theme} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 bebas-regular">
                  No courses published yet
                </h3>
                <p className="text-gray-500 poppins-regular">
                  Check back later for new content!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PublicTrainerProfile;

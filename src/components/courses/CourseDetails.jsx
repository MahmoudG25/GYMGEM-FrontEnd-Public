import { useState, useEffect, use } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Users,
  Globe,
  Award,
  Clock,
  PlayCircle,
  FileText,
  Download,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Heart,
  Share2,
  Lock,
  Video,
  File,
  Image as ImageIcon,
  Sparkles,
  Loader2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  X,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { addToFavorites, removeFromFavorites, isFavorite } from "../Dashboard/Traine/Favorite";
import { isUserEnrolled } from "../BuyNow/Checkout";
import axios from "axios";
import { get, set } from "react-hook-form";


const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // All state declarations at the top (before any conditional logic)
  const [course, setCourse] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [showLockModal, setShowLockModal] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isFavoriteCourse, setIsFavoriteCourse] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCourseById = async (id) => {
    const token = localStorage.getItem('access');
    try {
      const course = await axios.get(`http://localhost:8000/api/courses/courses/${id}/detail/`
        , {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setCourse(course.data);
    } catch (error) {
      console.error("Error fetching course by ID:", error);
    }
  };

  const getTrainerById = async (trainerId) => {
    const token = localStorage.getItem('access');
    try {
      const response = await axios.get(`http://localhost:8000/api/trainers/create?profile_id=${trainerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTrainer(response.data);
    } catch (error) {
      console.error("Error fetching trainer by ID:", error);
    }
  };

  useEffect(() => {
    getCourseById(id);
  }, [id]);

  useEffect(() => {
    if (course?.trainer_profile) {
      getTrainerById(course.trainer_profile);
    }
    if (course) {
      setIsFavoriteCourse(course.enrollment === "wishlist");
    }
  }, [course?.trainer_profile, course]);

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white">
          {/* Hero Section Skeleton */}
          <div className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
              {/* Back button skeleton */}
              <div className="h-5 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Content Skeleton */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Title skeleton */}
                  <div className="space-y-2">
                    <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse w-5/6"></div>
                  </div>

                  {/* Description skeleton */}
                  <div className="space-y-2 mt-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  </div>

                  {/* Badges skeleton */}
                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>

                  {/* Stats skeleton */}
                  <div className="flex flex-wrap items-center gap-6 mt-6">
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  {/* Mobile CTA skeleton */}
                  <div className="flex flex-wrap items-center gap-4 lg:hidden mt-6">
                    <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="h-12 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                </div>

                {/* Image skeleton */}
                <div className="lg:col-span-1">
                  <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 aspect-video bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column Skeleton */}
              <div className="lg:col-span-2 space-y-8">
                {/* Curriculum skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="h-8 bg-gray-200 rounded animate-pulse mb-6 w-40"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>

                {/* Description skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-48"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  </div>
                </div>

                {/* Instructor skeleton */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="h-8 bg-gray-200 rounded animate-pulse mb-6 w-40"></div>
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse mt-4"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar Skeleton */}
              <div className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  {/* Price card skeleton */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="h-10 bg-gray-200 rounded animate-pulse mb-6 w-24"></div>
                    <div className="space-y-3">
                      <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                  </div>

                  {/* What's Included skeleton */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-40"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  const handleToggleFavorite = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem('access');

    if (!user || !token) {
      navigate('/login');
      return;
    }

    try {
      setIsWishlistLoading(true);
      await axios.post(
        `http://localhost:8000/api/courses/enrollments/${course.id}/add-to-wishlist/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update local state based on successful toggle (assuming backend toggles)
      // Since we don't get the new state back explicitly in the prompt description, we toggle locally
      // Ideally backend returns { status: 'added' | 'removed' } or similar
      setIsFavoriteCourse(prev => !prev);

      // Update local storage if using it as backup/cache
      if (!isFavoriteCourse) {
        addToFavorites(course.id);
      } else {
        removeFromFavorites(course.id);
      }

    } catch (error) {
      console.error("Failed to update wishlist:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = window.location.href;
  const shareText = `Check out this course: ${course?.title}`;

  // Map backend level ID to level name
  const getLevelName = (levelId) => {
    const levels = { 1: "Beginner", 2: "Intermediate", 3: "Advanced" };
    return levels[levelId] || "Beginner";
  };

  // Map backend category ID to category name
  const getCategoryName = (categoryId) => {
    const categories = {
      13: "Strength Training",
      1: "Bodybuilding",
      2: "Cardio",
      3: "Flexibility & Mobility",
      5: "Nutrition",
    };
    return categories[categoryId] || "Fitness";
  };

  // Check if user is enrolled in the course
  const isEnrolled = course?.enrollment === "in_progress";

  // Course data - mixed from backend and dummy data
  const courseData = {
    // Backend data
    title: course.title,
    description: course.description,
    price: parseFloat(course.price) || 49.99,
    cover: course.cover,
    language: course.language || "EN",
    category: getCategoryName(course.category),
    level: getLevelName(course.level),
    status: course.status,
    createdAt: course.created_at,
    updatedAt: course.updated_at,
    trainerProfileId: course.trainer_profile,
    totalLessons: course.lessons?.length || 0,
    enrolledCount: course.students_enrolled,
    rating: course.ratings.average_rating,
    totalRatings: course.ratings.total_ratings,
    reviewsCount: course.ratings.total_ratings,
    lastUpdated: course.updated_at,
    enrollment: course.enrollment,


    totalVideoHours: 12,
    whatYouLearn: [
      "Master the fundamentals of strength training",
      "Create personalized workout routines",
      "Understand proper form and technique",
      "Learn nutrition strategies for muscle building",
      "Prevent common injuries and setbacks",
      "Track progress and set achievable goals",
    ],
    includes: [
      { icon: Video, text: `${12} hours of on-demand video` },
      { icon: FileText, text: `${course.lessons?.length || 0} lessons` },
      { icon: Download, text: "Downloadable resources" },
      { icon: Award, text: "Certificate of completion" },
    ],
    reviews: course.reviews
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleLockedLessonClick = () => {
    setShowLockModal(true);
  };

  const getContentIcon = (type) => {
    switch (type) {
      case "Video":
        return <Video className="w-4 h-4" />;
      case "Article":
        return <FileText className="w-4 h-4" />;
      case "PDF":
      case "DOC":
        return <File className="w-4 h-4" />;
      case "Image":
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <PlayCircle className="w-4 h-4" />;
    }
  };

  const handleBuyNow = () => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      // Store intended purchase for after login
      sessionStorage.setItem('intendedPurchase', JSON.stringify({
        courseId: course.id,
        returnUrl: `/courses/${course.id}`
      }));

      // Redirect to login
      navigate('/login');
      return;
    }

    // Navigate to checkout with course data
    navigate('/checkout', {
      state: {
        course: course,
        user: user
      }
    });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/courses"
            className="text-[#FF8211] text-sm font-medium hover:underline poppins-regular inline-flex items-center gap-1 mb-4"
          >
            ← Back to courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 bebas-regular mb-3">
                {courseData.title}
              </h1>

              <p className="text-lg text-gray-600 poppins-regular mb-6">
                {courseData.description || "Master the fundamentals and transform your approach to fitness"}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#FF8211]/10 text-[#FF8211] rounded-lg text-sm font-medium poppins-regular">
                  {courseData.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium poppins-regular flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  {courseData.level}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium poppins-regular flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {courseData.language}
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  {courseData.rating ? (
                    <>
                      <div className="flex text-[#FF8211]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.round(courseData.rating)
                              ? "fill-current"
                              : "text-gray-300 fill-gray-200"
                              }`}
                            strokeWidth={0}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-900 ml-2 poppins-regular">
                        {Number(courseData.rating).toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-600 poppins-regular">
                        ({courseData.reviewsCount.toLocaleString()} reviews)
                      </span>
                    </>
                  ) : (
                    <div className="inline-flex items-center gap-1 rounded-full bg-blue-600/90 px-2.5 py-1 text-xs font-bold shadow-sm text-white tracking-wide">
                      <Sparkles className="h-3.5 w-3.5 fill-white text-white" />
                      <span>NEW</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600 poppins-regular">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">
                    {courseData.enrolledCount.toLocaleString()} students enrolled
                  </span>
                </div>
              </div>

              {/* CTA Buttons (Mobile) */}
              <div className="flex flex-wrap items-center gap-4 lg:hidden mb-6">
                {isEnrolled ? (
                  <button
                    disabled
                    className="flex-1 px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold bebas-regular text-lg cursor-not-allowed shadow-sm"
                  >
                    Already Enrolled
                  </button>
                ) : (
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 px-8 py-3 bg-[#FF8211] text-white rounded-lg font-semibold bebas-regular text-lg hover:bg-[#ff7906] transition-colors shadow-sm"
                  >
                    Buy Now - ${courseData.price}
                  </button>
                )}
                <button className="px-6 py-3 border-2 border-[#FF8211] text-[#FF8211] rounded-lg hover:bg-[#FF8211]/10 transition-colors flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Course Preview (Desktop) */}
            <div className="lg:col-span-1">
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <img
                  src={courseData.cover}
                  alt={courseData.title}
                  className="w-full aspect-video object-cover"
                />
                {!isEnrolled && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-16 h-16 text-white mx-auto mb-3 opacity-90" />
                      <p className="text-white poppins-medium text-sm px-4">
                        🔒 You must enroll before accessing this course
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 bebas-regular mb-6">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseData.whatYouLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#86ac55] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 poppins-regular text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Curriculum (Locked) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 bebas-regular">
                  Course Curriculum
                </h2>
                <span className="text-sm text-gray-500 poppins-regular">
                  {course.lessons?.length || 0} sections
                </span>
              </div>

              <div className="space-y-2">
                {course.lessons_details && course.lessons_details.length > 0 ? (
                  course.lessons_details.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(lessonIndex)}
                        className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {expandedSections.has(lessonIndex) ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          )}
                          <span className="font-semibold text-gray-900 text-sm poppins-medium text-left">
                            {lesson.title || `Lesson ${lessonIndex + 1}`}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 poppins-regular">
                          {lesson.duration || "45min"}
                        </span>
                      </button>

                      {expandedSections.has(lessonIndex) && (
                        <div className="bg-white">
                          {lesson.sections && lesson.sections.length > 0 ? (
                            lesson.sections.map((section) => (
                              <button
                                key={section.id}
                                onClick={isEnrolled ? null : handleLockedLessonClick}
                                className={`w-full px-4 py-3 border-t border-gray-100 transition-colors flex items-center justify-between group ${
                                  isEnrolled ? "cursor-default" : "hover:bg-gray-50 cursor-pointer"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={isEnrolled ? "text-gray-600" : "text-gray-400"}>
                                    {getContentIcon(section.content_type)}
                                  </div>
                                  <span className={`text-sm poppins-regular text-left ${
                                    isEnrolled ? "text-gray-900" : "text-gray-700"
                                  }`}>
                                    {section.title}
                                  </span>
                                </div>
                                {!isEnrolled && <Lock className="w-4 h-4 text-gray-400" />}
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500 poppins-regular">
                              No sections available
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 poppins-regular text-center py-8">
                    No curriculum available yet
                  </p>
                )}
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 bebas-regular mb-4">
                Course Description
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 poppins-regular leading-relaxed">
                  {courseData.description || "Transform your fitness journey with this comprehensive strength training course designed for all levels."}
                </p>
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 bebas-regular mb-6">
                Your Trainer
              </h2>
              {trainer ? (
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full border-2 border-[#FF8211] flex-shrink-0 overflow-hidden bg-[#FF8211]/20 flex items-center justify-center">
                    {trainer.profile_picture ? (
                      <img
                        src={trainer.profile_picture}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold text-[#FF8211]">
                        {trainer.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 poppins-medium mb-1">
                      {trainer.name}
                    </h3>
                    <p className="text-gray-600 poppins-regular text-sm mb-4">
                      {trainer.gender ? trainer.gender.charAt(0).toUpperCase() + trainer.gender.slice(1) : ""} • {trainer.country || "Location not specified"}
                    </p>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600 poppins-regular mb-4">
                      {trainer.phone_number && (
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF8211]">📞</span>
                          <span>{trainer.phone_number}</span>
                        </div>
                      )}
                      {trainer.birthdate && (
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF8211]">📅</span>
                          <span>{new Date(trainer.birthdate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700 poppins-regular text-sm leading-relaxed mb-4">
                      {trainer.bio || "No bio available"}
                    </p>
                    <Link
                      to={`/trainer-profile/${course.trainer_profile}`}
                      className="px-4 py-2 border-2 border-[#FF8211] text-[#FF8211] rounded-lg font-medium poppins-regular text-sm hover:bg-[#FF8211]/10 transition-colors inline-block"
                    >
                      View Trainer Profile
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-6 mb-6 animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-gray-300 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 rounded w-1/3 mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-3" />
                    <div className="h-10 bg-gray-200 rounded w-40" />
                  </div>
                </div>
              )}
            </div>

            {/* Client Reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 bebas-regular mb-6">
                Client Reviews
              </h2>
              <div className="space-y-6">
                {courseData.reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#FF8211] flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 poppins-medium">
                            {review.name}
                          </h4>
                          <span className="text-xs text-gray-500 poppins-regular">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex text-[#FF8211] mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" strokeWidth={0} />
                          ))}
                        </div>
                        <p className="text-gray-700 poppins-regular text-sm">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Desktop) */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#FF8211] bebas-regular">
                    ${courseData.price}
                  </span>
                </div>

                <div className="space-y-3">
                  {isEnrolled ? (
                    <button
                      disabled
                      className="w-full px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold bebas-regular text-lg cursor-not-allowed shadow-sm"
                    >
                      Already Enrolled
                    </button>
                  ) : isPurchased ? (
                    <Link
                      to={`/courses/${course.id}/learn`}
                      className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold bebas-regular text-lg hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Start Learning
                    </Link>
                  ) : (
                    <button
                      onClick={handleBuyNow}
                      className="w-full px-6 py-3 bg-[#FF8211] text-white rounded-lg font-semibold bebas-regular text-lg hover:bg-[#ff7906] transition-colors shadow-sm"
                    >
                      Enroll Now
                    </button>
                  )}
                  <button
                    onClick={handleToggleFavorite}
                    disabled={isWishlistLoading}
                    className={`w-full px-6 py-3 border-2 rounded-lg font-semibold bebas-regular text-lg transition-colors flex items-center justify-center gap-2 ${isFavoriteCourse
                      ? "bg-[#FF8211] border-[#FF8211] text-white hover:bg-[#ff7906]"
                      : "border-[#FF8211] text-[#FF8211] hover:bg-[#FF8211]/10"
                      } ${isWishlistLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isWishlistLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Heart className={`w-5 h-5 ${isFavoriteCourse ? "fill-white" : ""}`} />
                    )}
                    {isFavoriteCourse ? "Remove from Wishlist" : "Add to Wishlist"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium poppins-regular hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 bebas-regular text-xl mb-4">
                  What's Included
                </h3>
                <div className="space-y-3">
                  {courseData.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-[#FF8211]" />
                      <span className="text-sm text-gray-700 poppins-regular">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-2xl font-bold text-[#FF8211] bebas-regular">
              ${courseData.price}
            </span>
          </div>
          <button
            onClick={handleToggleFavorite}
            className={`p-3 border-2 rounded-lg transition-colors ${isFavoriteCourse
              ? "bg-[#FF8211] border-[#FF8211] text-white"
              : "border-[#FF8211] text-[#FF8211] bg-white"
              }`}
          >
            <Heart className={`w-6 h-6 ${isFavoriteCourse ? "fill-white" : ""}`} />
          </button>
          {isEnrolled ? (
            <button
              disabled
              className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold bebas-regular cursor-not-allowed shadow-sm"
            >
              Already Enrolled
            </button>
          ) : isPurchased ? (
            <Link
              to={`/courses/${course.id}/learn`}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold bebas-regular text-lg hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Learning
            </Link>
          ) : (
            <button
              onClick={handleBuyNow}
              className="flex-1 px-6 py-3 bg-[#FF8211] text-white rounded-lg font-semibold bebas-regular hover:bg-[#ff7906] transition-colors shadow-sm"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>

      {/* Lock Modal */}
      {showLockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF8211]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#FF8211]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 bebas-regular mb-2">
                This lesson is locked
              </h3>
              <p className="text-gray-600 poppins-regular mb-6">
                Purchase the course to continue learning and access all lessons.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowLockModal(false);
                    handleBuyNow();
                  }}
                  className="w-full px-6 py-3 bg-[#FF8211] text-white rounded-lg font-semibold bebas-regular hover:bg-[#ff7906] transition-colors"
                >
                  Buy Course - ${courseData.price}
                </button>
                <button
                  onClick={() => setShowLockModal(false)}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium poppins-regular hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-xl max-w-sm w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 bebas-regular">
                Share this course
              </h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 poppins-regular mb-6">
              Share this course with your friends and colleagues.
            </p>

            <div className="flex justify-center gap-6 mb-8">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5 text-blue-600 group-hover:text-white" />
                </div>
                <span className="text-xs text-gray-600 poppins-regular">Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                  <Twitter className="w-5 h-5 text-sky-500 group-hover:text-white" />
                </div>
                <span className="text-xs text-gray-600 poppins-regular">Twitter</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-700/10 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5 text-blue-700 group-hover:text-white" />
                </div>
                <span className="text-xs text-gray-600 poppins-regular">LinkedIn</span>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <div className="w-5 h-5 flex items-center justify-center text-green-500 group-hover:text-white font-bold text-xs" >WA</div>
                </div>
                <span className="text-xs text-gray-600 poppins-regular">WhatsApp</span>
              </a>
            </div>

            <div className="relative">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 poppins-regular pr-24"
              />
              <button
                onClick={handleCopyLink}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#FF8211] text-white rounded-md text-xs font-semibold hover:bg-[#ff7906] transition-colors flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default CourseDetails;

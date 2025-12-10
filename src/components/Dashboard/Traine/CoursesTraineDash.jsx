import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Award, BookOpen, ArrowRight } from "lucide-react";
import NavTraineDash from "./NavTraineDash";
import FooterDash from "./../FooterDash";
import { getUserEnrolledCourses } from "../../BuyNow/Checkout";
import axiosInstance from "../../../utils/axiosConfig";

const CoursesTraineDash = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to format duration from minutes to hours
  const formatDuration = (minutes) => {
    if (!minutes || minutes === 0) return "--";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
    if (hours > 0) return `${hours}h`;
    return `${mins}m`;
  };

  // Helper function to get category name (you might need to adjust based on your categories)
  const getCategoryName = (categoryId) => {
    const categories = {
      1: "Strength",
      2: "Cardio",
      3: "Yoga",
      4: "Nutrition",
      // Add more categories as needed
    };
    return categories[categoryId] || "Fitness";
  };

  // Helper function to get level name
  const getLevelName = (levelId) => {
    const levels = {
      1: "Beginner",
      2: "Intermediate",
      3: "Advanced",
    };
    return levels[levelId] || "Beginner";
  };


  const getEnrolledCourses = async () => {
    try {
      // Using axiosInstance - automatic token refresh!
      const response = await axiosInstance.get("/api/courses/enrollments/my-enrollments");
      setEnrolledCourses(response.data);
      console.log(enrolledCourses);
    } catch (error) {
      console.error('Error reading enrollments:', error);
    }
  };
  useEffect(() => {
    getEnrolledCourses();
    console.log(enrolledCourses);
    setLoading(false);
  }, []);

  return (
    <>
      <NavTraineDash />
      <main>
        <div className="bg-gray-50 text-foreground min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-bebas text-4xl md:text-5xl text-[#ff8211] mb-2">
                Your Enrolled Courses
              </h1>
              <p className="text-gray-600 poppins-regular">
                Browse and manage the courses you are enrolled in.
              </p>
            </div>

            {/* Courses Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-[#FF8211] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600 poppins-regular">Loading your courses...</p>
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.course_details.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Course Image */}
                    <div className="relative">
                      <img
                        src={course.course_details.cover || "https://via.placeholder.com/400x225"}
                        alt={course.course_details.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-medium poppins-regular">
                        Enrolled
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-5">
                      {/* Category & Level Badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#FF8211]/10 text-[#FF8211] rounded-lg text-xs font-medium poppins-regular">
                          {getCategoryName(course.course_details.category)}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium poppins-regular flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {getLevelName(course.course_details.level)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 bebas-regular mb-2 line-clamp-2">
                        {course.course_details.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 poppins-regular text-sm mb-4 line-clamp-2">
                        {course.course_details.description || "Master the fundamentals and transform your approach"}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-gray-700 poppins-regular">
                            Progress
                          </span>
                          <span className="text-xs font-medium text-[#FF8211] poppins-regular">
                            0%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#FF8211] h-2 rounded-full transition-all"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 poppins-regular">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDuration(course.course_details.total_duration)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.course_details.lesson_count || 0} lessons</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        to={`/courses/${course.course_details.id}/learn`}
                        className="w-full px-4 py-3 bg-[#FF8211] text-white rounded-lg font-semibold bebas-regular text-lg hover:bg-[#ff7906] transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        Continue Learning
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 bebas-regular mb-3">
                  No Courses Yet
                </h2>
                <p className="text-gray-600 poppins-regular mb-6 max-w-md mx-auto">
                  You haven't enrolled in any courses yet. Start your fitness journey by browsing our course catalog!
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF8211] text-white rounded-lg font-semibold bebas-regular text-lg hover:bg-[#ff7906] transition-colors shadow-sm"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse Courses
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterDash />
    </>
  );
};

export default CoursesTraineDash;


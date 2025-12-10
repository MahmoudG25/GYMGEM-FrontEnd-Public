import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  MessageCircle,
  Video,
  File,
  Image as ImageIcon
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const CourseEnroll = () => {
  const { id } = useParams();
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const course = courses.find((c) => String(c.id) === id);
  
  const [expandedSections, setExpandedSections] = useState(new Set([0]));
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Load user and comments on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    
    // Load comments for this specific course
    const storedComments = JSON.parse(localStorage.getItem(`course_comments_${id}`)) || [];
    if (storedComments.length === 0) {
      // Add some mock comments if none exist
      const mockComments = [
        {
          id: 1,
          user: "John Doe",
          avatar: "JD",
          avatarColor: "bg-[#FF8211]",
          text: "Great explanation! This really helped me understand the basics.",
          time: "2 days ago"
        },
        {
          id: 2,
          user: "Anna Smith",
          avatar: "AS",
          avatarColor: "bg-[#86ac55]",
          text: "Can you provide more examples for the advanced techniques?",
          time: "1 week ago"
        }
      ];
      setComments(mockComments);
      localStorage.setItem(`course_comments_${id}`, JSON.stringify(mockComments));
    } else {
      setComments(storedComments);
    }
  }, [id]);

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: currentUser?.name || "Guest User",
      avatar: currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : "GU",
      avatarColor: "bg-[#FF8211]",
      text: newComment,
      time: "Just now"
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    setNewComment("");
    localStorage.setItem(`course_comments_${id}`, JSON.stringify(updatedComments));
  };

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#FF8211] bebas-medium mb-4">
              Course Not Found
            </h1>
            <Link
              to="/courses"
              className="text-[#FF8211] hover:underline poppins-regular"
            >
              ← Back to Courses
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Mock data for demonstration
  const courseData = {
    rating: 4.8,
    reviewsCount: 1247,
    enrolledCount: 5832,
    instructor: (() => {
      // Try to get trainer profile from localStorage or use course data
      const savedProfile = JSON.parse(localStorage.getItem("trainerProfile"));
      // In a real app, we would fetch the specific trainer by ID
      // For now, we'll use the saved profile if available, or fallback data
      return {
        id: savedProfile?.id || "trainer-1",
        name: savedProfile?.name || "Sarah Johnson",
        title: savedProfile?.job || "Certified Fitness Trainer",
        bio: savedProfile?.bio || "15+ years of experience in strength training and nutrition",
        avatar: savedProfile?.avatar || "https://ui-avatars.com/api/?name=Sarah+Johnson&background=FF8211&color=fff",
      };
    })(),
    lastUpdated: "December 2024",
    certificate: true,
    includes: [
      { icon: Video, text: "12 hours of video content" },
      { icon: FileText, text: "45 articles and resources" },
      { icon: Download, text: "Downloadable materials" },
      { icon: Award, text: "Certificate of completion" },
    ],
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

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  const toggleComplete = () => {
    if (currentLesson) {
      setCompletedLessons((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(currentLesson.id)) {
          newSet.delete(currentLesson.id);
        } else {
          newSet.add(currentLesson.id);
        }
        return newSet;
      });
    }
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

  const totalLessons = course.lessons?.reduce((acc, lesson) => {
    return acc + (lesson.sections?.length || 1);
  }, 0) || 0;

  const completionPercentage = totalLessons > 0 
    ? Math.round((completedLessons.size / totalLessons) * 100) 
    : 0;

  // Set first lesson as current if none selected
  if (!currentLesson && course.lessons && course.lessons.length > 0) {
    const firstLesson = course.lessons[0];
    const firstSection = firstLesson.sections && firstLesson.sections[0];
    setCurrentLesson(firstSection || firstLesson);
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Header */}
      <div className="w-full bg-gradient-to-r from-[#FF8211]/10 to-[#86ac55]/10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/courses"
            className="text-[#FF8211] text-sm font-medium hover:underline poppins-regular inline-flex items-center gap-1 mb-4"
          >
            ← Back to courses
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 bebas-regular mb-3">
            {course.title}
          </h1>

          <p className="text-lg text-gray-600 poppins-regular max-w-3xl mb-6">
            {course.description || "Master the fundamentals and advance your skills"}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-[#FF8211]/10 text-[#FF8211] rounded-full text-sm font-medium poppins-regular">
              {course.category || "Fitness"}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium poppins-regular flex items-center gap-1">
              <Award className="w-4 h-4" />
              {course.level || "Beginner"}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium poppins-regular flex items-center gap-1">
              <Globe className="w-4 h-4" />
              {course.language || "English"}
            </span>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-1">
              <div className="flex text-[#FF8211]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-current"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900 ml-2 poppins-regular">
                {courseData.rating}
              </span>
              <span className="text-sm text-gray-600 poppins-regular">
                ({courseData.reviewsCount.toLocaleString()} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 poppins-regular">
              <Users className="w-5 h-5" />
              <span className="text-sm">
                {courseData.enrolledCount.toLocaleString()} students enrolled
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" title="Share Course">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {course.price && (
            <div className="mt-6">
              <span className="text-3xl font-bold text-[#86ac55] bebas-regular">
                ${course.price}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Player */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                <div className="text-center text-white">
                  <PlayCircle className="w-20 h-20 mx-auto mb-4 opacity-70" />
                  <p className="text-lg poppins-regular opacity-90">
                    {currentLesson?.title || "Select a lesson to begin"}
                  </p>
                </div>
              </div>

              {currentLesson && (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 poppins-regular mb-1">
                        Current Lesson
                      </p>
                      <h2 className="text-2xl font-bold text-gray-900 bebas-regular">
                        {currentLesson.title}
                      </h2>
                    </div>
                    <button
                      onClick={toggleComplete}
                      className={`px-4 py-2 rounded-lg font-medium poppins-regular text-sm flex items-center gap-2 transition-colors ${
                        completedLessons.has(currentLesson.id)
                          ? "bg-[#86ac55] text-white"
                          : "bg-[#FF8211] text-white hover:bg-[#ff7906]"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {completedLessons.has(currentLesson.id)
                        ? "Completed"
                        : "Mark Complete"}
                    </button>
                  </div>

                  <p className="text-gray-600 poppins-regular mb-4">
                    {currentLesson.description || currentLesson.contentText || "— empty —"}
                  </p>

                  {currentLesson.contentUrl && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 poppins-medium">
                        Attachments
                      </h4>
                      <a
                        href={currentLesson.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#FF8211] hover:underline poppins-regular"
                      >
                        <Download className="w-4 h-4" />
                        Download Material
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 bebas-regular mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#FF8211]" />
                Discussion
              </h3>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <div className={`w-10 h-10 rounded-full ${comment.avatarColor} flex items-center justify-center text-white font-semibold shrink-0`}>
                        {comment.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="font-semibold text-gray-900 text-sm poppins-medium mb-1">
                            {comment.user}
                          </p>
                          <p className="text-gray-700 text-sm poppins-regular">
                            {comment.text}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 poppins-regular">{comment.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 poppins-regular py-4">No comments yet. Be the first to start the discussion!</p>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <textarea
                  placeholder={currentUser ? "Add your comment..." : "Please log in to comment"}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={!currentUser}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8211] focus:border-transparent poppins-regular text-sm resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  rows={3}
                />
                <button 
                  onClick={handlePostComment}
                  disabled={!currentUser || !newComment.trim()}
                  className="mt-3 px-6 py-2 bg-[#FF8211] text-white rounded-lg font-medium bebas-regular hover:bg-[#ff7906] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Progress Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 bebas-regular text-xl mb-4">
                  Your Progress
                </h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#f3f4f6"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#FF8211"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionPercentage / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#FF8211] bebas-regular">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 poppins-regular">
                  {completedLessons.size} of {totalLessons} lessons completed
                </p>
              </div>

              {/* Curriculum */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 bebas-regular text-xl mb-4">
                  Course Curriculum
                </h3>

                <div className="space-y-2">
                  {course.lessons && course.lessons.length > 0 ? (
                    course.lessons.map((lesson, lessonIndex) => (
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
                              {lesson.title}
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
                                  onClick={() => handleLessonClick(section)}
                                  className={`w-full px-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between group ${
                                    currentLesson?.id === section.id
                                      ? "bg-[#FF8211]/5 border-l-4 border-l-[#FF8211]"
                                      : ""
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="text-gray-500 group-hover:text-[#FF8211] transition-colors">
                                      {getContentIcon(section.contentType)}
                                    </div>
                                    <span className="text-sm text-gray-700 poppins-regular text-left">
                                      {section.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {completedLessons.has(section.id) && (
                                      <CheckCircle2 className="w-4 h-4 text-[#86ac55]" />
                                    )}
                                  </div>
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500 poppins-regular">
                                — No sections —
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 poppins-regular text-center py-4">
                      — No lessons available —
                    </p>
                  )}
                </div>
              </div>

              {/* Instructor Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 bebas-regular text-xl mb-4">
                  Instructor
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={courseData.instructor.avatar}
                    alt={courseData.instructor.name}
                    className="w-16 h-16 rounded-full border-2 border-[#FF8211]"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 poppins-medium">
                      {courseData.instructor.name}
                    </h4>
                    <p className="text-sm text-gray-600 poppins-regular">
                      {courseData.instructor.title}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 poppins-regular mb-4">
                  {courseData.instructor.bio}
                </p>
                <Link 
                  to="/trainer-profile"
                  className="block w-full text-center px-4 py-2 border-2 border-[#FF8211] text-[#FF8211] rounded-lg font-semibold bebas-regular hover:bg-[#FF8211]/10 transition-colors"
                >
                  View Profile
                </Link>
              </div>

              {/* Course Includes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 bebas-regular text-xl mb-4">
                  This Course Includes
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
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 poppins-regular">Last updated:</span>
                    <span className="text-gray-900 poppins-medium">{courseData.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 poppins-regular">Language:</span>
                    <span className="text-gray-900 poppins-medium">{course.language || "English"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseEnroll;

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Book,
  Clock,
  Award,
  Globe,
  Video,
  FileText,
  File as FileIcon,
  Image as ImageIcon,
  PlayCircle,
  Save,
  X,
} from "lucide-react";
import NavBarDash from "./NavBarDash";
import FooterDash from "../FooterDash";

const CourseDetailsDash = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [expandedSections, setExpandedSections] = useState(new Set());

  // Editing States
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingLearn, setIsEditingLearn] = useState(false);

  // Form States
  const [infoForm, setInfoForm] = useState({});
  const [descForm, setDescForm] = useState("");
  const [learnForm, setLearnForm] = useState([]);

  useEffect(() => {
    // Load course from localStorage
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const foundCourse = courses.find((c) => String(c.id) === id);
    if (foundCourse) {
      // Ensure whatYouLearn exists
      if (!foundCourse.whatYouLearn) {
        foundCourse.whatYouLearn = [
          "Master the fundamentals of strength training",
          "Create personalized workout routines",
          "Understand proper form and technique",
          "Learn nutrition strategies for muscle building",
          "Prevent common injuries and setbacks",
          "Track progress and set achievable goals",
        ];
      }
      setCourse(foundCourse);
      setInfoForm({
        title: foundCourse.title,
        price: foundCourse.price,
        category: foundCourse.category,
        level: foundCourse.level,
        language: foundCourse.language,
      });
      setDescForm(foundCourse.description || "");
      setLearnForm(foundCourse.whatYouLearn);
    }
  }, [id]);

  const updateCourseInStorage = (updatedCourse) => {
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const updatedCourses = courses.map((c) =>
      c.id === updatedCourse.id ? updatedCourse : c
    );
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    setCourse(updatedCourse);
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

  const getContentIcon = (type) => {
    switch (type) {
      case "Video":
        return <Video className="w-4 h-4" />;
      case "Article":
        return <FileText className="w-4 h-4" />;
      case "PDF":
      case "DOC":
        return <FileIcon className="w-4 h-4" />;
      case "Image":
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <PlayCircle className="w-4 h-4" />;
    }
  };

  const handlePublishToggle = () => {
    if (!course) return;
    const newStatus = course.status === "Published" ? "Draft" : "Published";
    const updatedCourse = { ...course, status: newStatus };
    updateCourseInStorage(updatedCourse);
  };

  const handleDeleteCourse = () => {
    if (!course) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete "${course.title}"? This action cannot be undone.`
    );
    if (confirmed) {
      const courses = JSON.parse(localStorage.getItem("courses")) || [];
      const updatedCourses = courses.filter((c) => c.id !== course.id);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
      navigate("/trainer/courses");
    }
  };

  // Save Handlers
  const handleSaveInfo = () => {
    const updatedCourse = { ...course, ...infoForm };
    updateCourseInStorage(updatedCourse);
    setIsEditingInfo(false);
  };

  const handleSaveDesc = () => {
    const updatedCourse = { ...course, description: descForm };
    updateCourseInStorage(updatedCourse);
    setIsEditingDesc(false);
  };

  const handleSaveLearn = () => {
    const updatedCourse = { ...course, whatYouLearn: learnForm };
    updateCourseInStorage(updatedCourse);
    setIsEditingLearn(false);
  };

  // Learn Section Helpers
  const handleAddLearnItem = () => {
    setLearnForm([...learnForm, ""]);
  };

  const handleRemoveLearnItem = (index) => {
    const newItems = learnForm.filter((_, i) => i !== index);
    setLearnForm(newItems);
  };

  const handleLearnItemChange = (index, value) => {
    const newItems = [...learnForm];
    newItems[index] = value;
    setLearnForm(newItems);
  };

  if (!course) {
    return (
      <>
        <NavBarDash />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Course not found
            </h2>
            <Link
              to="/trainer/courses"
              className="text-[#FF8211] hover:underline"
            >
              ← Back to Courses
            </Link>
          </div>
        </div>
      </>
    );
  }

  const clientReviews = [
    {
      id: 1,
      name: "Michael Turner",
      avatar: "MT",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent course! The techniques are easy to follow and very effective. I've seen great results in just a few weeks.",
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      avatar: "ER",
      rating: 5,
      date: "1 month ago",
      comment:
        "This transformed my approach to fitness. The trainer is knowledgeable and explains everything clearly.",
    },
    {
      id: 3,
      name: "David Chen",
      avatar: "DC",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great content and clear instruction. The workout plans are practical and effective.",
    },
  ];

  return (
    <>
      <NavBarDash />
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/trainer/courses"
            className="inline-flex items-center text-[#FF8211] hover:underline mb-6 poppins-regular text-sm"
          >
            ← Back to Courses
          </Link>

          {/* Top Section - Course Info */}
          <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Course Image */}
              <div className="md:col-span-1">
                <img
                  src={course.img || "https://via.placeholder.com/400x300"}
                  alt={course.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Course Details */}
              <div className="md:col-span-2 p-6">
                {isEditingInfo ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course Title
                      </label>
                      <input
                        type="text"
                        value={infoForm.title}
                        onChange={(e) =>
                          setInfoForm({ ...infoForm, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8211]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={infoForm.category}
                          onChange={(e) =>
                            setInfoForm({
                              ...infoForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8211]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Level
                        </label>
                        <select
                          value={infoForm.level}
                          onChange={(e) =>
                            setInfoForm({ ...infoForm, level: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8211]"
                        >
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <input
                          type="text"
                          value={infoForm.language}
                          onChange={(e) =>
                            setInfoForm({
                              ...infoForm,
                              language: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8211]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          value={infoForm.price}
                          onChange={(e) =>
                            setInfoForm({ ...infoForm, price: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8211]"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setIsEditingInfo(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveInfo}
                        className="px-4 py-2 bg-[#FF8211] text-white rounded-md hover:bg-[#ff7906]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 bebas-regular">
                      {course.title}
                    </h1>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-[#FF8211]/10 text-[#FF8211] rounded-lg text-sm font-medium poppins-regular flex items-center gap-1">
                        <Book className="w-4 h-4" />
                        {course.category || "Fitness"}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium poppins-regular flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {course.level || "Beginner"}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium poppins-regular flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {course.language || "English"}
                      </span>
                    </div>

                    {/* Price and Status */}
                    <div className="flex flex-wrap items-center gap-6 mb-6">
                      <div>
                        <span className="text-sm text-muted-foreground poppins-regular block mb-1">
                          Price
                        </span>
                        <span className="text-2xl font-bold text-[#86ac55] bebas-regular">
                          ${course.price || "0"}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground poppins-regular block mb-1">
                          Status
                        </span>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium poppins-regular ${
                            course.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {course.status === "Published" ? (
                            <Eye className="w-4 h-4 mr-1" />
                          ) : (
                            <EyeOff className="w-4 h-4 mr-1" />
                          )}
                          {course.status || "Draft"}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground poppins-regular block mb-1">
                          Students
                        </span>
                        <span className="text-xl font-semibold text-foreground poppins-medium">
                          {course.client || 0}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground bebas-regular">
                Course Description
              </h2>
              {!isEditingDesc && (
                <button
                  onClick={() => setIsEditingDesc(true)}
                  className="text-[#FF8211] hover:text-[#ff7906] poppins-regular text-sm flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
            {isEditingDesc ? (
              <div className="space-y-4">
                <textarea
                  value={descForm}
                  onChange={(e) => setDescForm(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8211]"
                  placeholder="Enter course description..."
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsEditingDesc(false);
                      setDescForm(course.description || "");
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSaveDesc}
                    className="px-4 py-2 bg-[#FF8211] text-white rounded-md hover:bg-[#ff7906] flex items-center gap-1"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground poppins-regular leading-relaxed whitespace-pre-wrap">
                {course.description ||
                  "Transform your fitness journey with this comprehensive course designed for all levels. Learn proper techniques, build strength safely, and achieve your goals with expert guidance."}
              </p>
            )}
          </div>

          {/* What You Will Learn Section */}
          {/* <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground bebas-regular">
                What You'll Learn
              </h2>
              {!isEditingLearn && (
                <button
                  onClick={() => setIsEditingLearn(true)}
                  className="px-4 py-2 bg-[#FF8211] text-white rounded-lg hover:bg-[#ff7906] transition-colors poppins-regular text-sm flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit List
                </button>
              )}
            </div>

            {isEditingLearn ? (
              <div className="space-y-4">
                {learnForm.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleLearnItemChange(idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8211]"
                      placeholder="Enter learning point..."
                    />
                    <button
                      onClick={() => handleRemoveLearnItem(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddLearnItem}
                  className="text-[#FF8211] hover:text-[#ff7906] text-sm font-medium flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Item
                </button>
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setIsEditingLearn(false);
                      setLearnForm(course.whatYouLearn || []);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSaveLearn}
                    className="px-4 py-2 bg-[#FF8211] text-white rounded-md hover:bg-[#ff7906] flex items-center gap-1"
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouLearn && course.whatYouLearn.length > 0 ? (
                  course.whatYouLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#86ac55]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-[#86ac55]" />
                      </div>
                      <span className="text-muted-foreground poppins-regular text-sm">
                        {item}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No learning points added yet.
                  </p>
                )}
              </div>
            )}
          </div> */}

          {/* Curriculum Section */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground bebas-regular">
                Course Curriculum
              </h2>
              <div className="flex gap-2">
                <Link
                  to="/addlesson"
                  state={{ course }}
                  className="px-4 py-2 bg-[#FF8211] text-white rounded-lg hover:bg-[#ff7906] transition-colors poppins-regular text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Lesson
                </Link>
              </div>
            </div>

            {course.lessons && course.lessons.length > 0 ? (
              <div className="space-y-2">
                {course.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSection(lessonIndex)}
                      className="w-full px-4 py-3 bg-muted hover:bg-muted/80 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        {expandedSections.has(lessonIndex) ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className="font-semibold text-foreground poppins-medium">
                          {lesson.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground poppins-regular">
                          {lesson.sections?.length || 0} sections
                        </span>
                        <span className="text-sm text-muted-foreground poppins-regular flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration || "45min"}
                        </span>
                      </div>
                    </button>

                    {expandedSections.has(lessonIndex) && (
                      <div className="bg-background">
                        {lesson.sections && lesson.sections.length > 0 ? (
                          lesson.sections.map((section) => (
                            <div
                              key={section.id}
                              className="px-4 py-3 border-t border-border flex items-center justify-between hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-muted-foreground">
                                  {getContentIcon(section.contentType)}
                                </div>
                                <span className="text-sm text-foreground poppins-regular">
                                  {section.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="text-[#FF8211] hover:text-[#ff7906] p-1">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-700 p-1">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground poppins-regular">
                            No sections added yet
                          </div>
                        )}
                        <div className="px-4 py-3 border-t border-border">
                          <Link
                            to="/addsection"
                            state={{ course, lesson }}
                            className="text-[#FF8211] hover:text-[#ff7906] poppins-regular text-sm flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Add Section
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground poppins-regular mb-4">
                  No lessons added yet
                </p>
                <Link
                  to="/addlesson"
                  state={{ course }}
                  className="inline-flex items-center px-4 py-2 bg-[#FF8211] text-white rounded-lg hover:bg-[#ff7906] transition-colors poppins-regular text-sm gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create First Lesson
                </Link>
              </div>
            )}
          </div>

          {/* Client Reviews Section */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground bebas-regular mb-6">
              Client Reviews
            </h2>
            <div className="space-y-6">
              {clientReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-border pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FF8211] flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground poppins-medium">
                          {review.name}
                        </h4>
                        <span className="text-xs text-muted-foreground poppins-regular">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex text-[#FF8211] mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-current"
                            strokeWidth={0}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground poppins-regular text-sm">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-end">
            <button
              onClick={() => setIsEditingInfo(true)}
              className="px-6 py-3 border-2 border-[#FF8211] text-[#FF8211] rounded-lg hover:bg-[#FF8211]/10 transition-colors poppins-medium flex items-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Edit Course
            </button>
            <button
              onClick={handlePublishToggle}
              className={`px-6 py-3 rounded-lg transition-colors poppins-medium flex items-center gap-2 ${
                course.status === "Published"
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-[#86ac55] text-white hover:bg-[#86ac55]/90"
              }`}
            >
              {course.status === "Published" ? (
                <>
                  <EyeOff className="w-5 h-5" />
                  Unpublish
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  Publish
                </>
              )}
            </button>
            <button
              onClick={handleDeleteCourse}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors poppins-medium flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Delete Course
            </button>
          </div>
        </div>
      </div>
      <FooterDash />
    </>
  );
};

export default CourseDetailsDash;

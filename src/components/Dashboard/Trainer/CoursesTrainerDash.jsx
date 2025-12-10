import { Link } from "react-router-dom";
import testimg from "../../../assets/cardCo1.png";
import testimg2 from "../../../assets/Sports Nutrition for Weight Loss.jpg";
import testimg3 from "../../../assets/Fat Burning Cardio Workouts.jpg";
import testimg4 from "../../../assets/Muscle Building.jpg";
import { v4 as uuidv4 } from "uuid";
import { IoIosTrash } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { ChevronDown, ChevronRight, Play, Pause } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCategoryName } from "../../../utils/categoryMapping";
import axiosInstance from "../../../utils/axiosConfig";
import NavBarDash from "./NavBarDash.jsx";
import FooterDash from "../FooterDash.jsx";
const initialRows = [
  {
    id: 1,
    title: "30-Day Full Body Toning Challenge",
    client: "580",
    status: "Published",
    category: "Strength Training",
    img: testimg,
  },
  {
    id: 2,
    title: "Muscle Building Basics for Beginners",
    client: "315",
    status: "Published",
    category: "Bodybuilding",
    img: testimg4,
  },
  {
    id: 3,
    title: "Fat Burning Cardio Workouts",
    client: "920",
    status: "Published",
    category: "Cardio",
    img: testimg3,
  },
  {
    id: 4,
    title: "Morning Yoga and Flexibility Flow",
    client: "155",
    status: "Draft",
    category: "Flexibility & Mobility",
    img: testimg,
  },
  {
    id: 5,
    title: "Sports Nutrition for Weight Loss",
    client: "450",
    status: "Published",
    category: "Nutrition",
    img: testimg2,
  },
];
const CoursesTrainerDash = () => {
  const [filters, setFilters] = useState({
    category: "All",
    status: "Published",
    sort: "Newest",
  });
  const [query, setQuery] = useState("");
  // stateful rows so we can edit/delete
  const savedRows = JSON.parse(localStorage.getItem("courses")) || initialRows;
  const [rows, setRows] = useState(savedRows);

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [expandedCourses, setExpandedCourses] = useState(new Set());
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [editLessonValues, setEditLessonValues] = useState({});
  const location = useLocation();

  // effect: reset page when filters/search changes
  useEffect(() => {
    setPage(1);
  }, [filters, query]);

  const filteredRows = useMemo(() => {
    let list = [...rows];

    const q = (query || "").trim().toLowerCase();

    if (q) {
      list = list.filter((r) => {
        return (
          (r.title || "").toLowerCase().includes(q) ||
          (String(r.client) || "").toLowerCase().includes(q) ||
          (r.category || "").toLowerCase().includes(q)
        );
      });
    }

    if (filters.category !== "All") {
      list = list.filter((r) => (r.category || "") === filters.category);
    }
    if (filters.status) {
      list = list.filter((r) => r.status === filters.status);
    }
    switch (filters.sort) {
      case "Newest":
        list.sort((a, b) => b.id - a.id);
        break;
      case "Oldest":
        list.sort((a, b) => a.id - b.id);
        break;
      case "Title (A–Z)":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return list;
  }, [rows, filters, query]);

  const totalCount = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const offset = (currentPage - 1) * pageSize;
  const visibleRows = filteredRows.slice(offset, offset + pageSize);

  // ensure page is in range when data changes
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]);

 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
   
        console.log("Fetching courses from API...");

        // Use axiosInstance instead of axios
        // No need to add Authorization header - the interceptor does it!
        const response = await axiosInstance.get("/api/courses/courses/my-courses");

        console.log("API Response:", response.data);

        // Handle different response structures
        let coursesData = response.data;

        // If the response is wrapped in a results array
        if (coursesData.results) {
          coursesData = coursesData.results;
        }

        // Map API data to match component's expected format
        const mappedCourses = coursesData.map(course => {
          // Debug: Log each course structure
          console.log("Processing course:", course.id, course.title);
          console.log("Course sections:", course.sections);
          console.log("Course lessons:", course.lessons);

          // Extract lessons - they might be directly in course.lessons 
          // OR nested inside course.sections
          let allLessons = [];

          if (course.lessons && Array.isArray(course.lessons)) {
            // Direct lessons array
            allLessons = course.lessons;
          } else if (course.sections && Array.isArray(course.sections)) {
            // Lessons are nested inside sections
            allLessons = course.sections.flatMap(section => {
              console.log(`  Section: ${section.title}, Lessons:`, section.lessons);
              return (section.lessons || []).map(lesson => ({
                ...lesson,
                sectionTitle: section.title, // Keep track of which section this lesson belongs to
                sectionId: section.id,
              }));
            });
          }

          console.log(`  Total lessons found: ${allLessons.length}`);

          return {
            id: course.id,
            title: course.title || "Untitled Course",
            price: course.price || 0,
            // Map cover to img
            img: course.cover || course.img || testimg,
            // Map category ID to name if needed
            category: typeof course.category === 'number'
              ? getCategoryName(course.category)
              : (course.category || "Uncategorized"),
            // Capitalize status
            status: course.status
              ? course.status.charAt(0).toUpperCase() + course.status.slice(1).toLowerCase()
              : "Draft",
            // Client count or enrolled students
            client: course.enrolled_students || course.client || "0",
            // Lessons array (extracted from sections if needed)
            lessons: allLessons,
            // Keep sections if they exist
            sections: course.sections || [],
            // Additional fields
            description: course.description || "",
            preview_video: course.preview_video || "",
          };
        });

        console.log("Mapped courses:", mappedCourses);
        setRows(mappedCourses);

        // Optionally save to localStorage
        localStorage.setItem("courses", JSON.stringify(mappedCourses));
      }
      catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
    fetchCourses();
  }, [])



















  // Toggle course expansion to show/hide lessons
  const toggleCourseExpansion = (courseId) => {
    setExpandedCourses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  // Delete lesson
  const handleDeleteLesson = (courseId, lessonId, lessonTitle) => {
    const ok = window.confirm(`Delete lesson "${lessonTitle}"?`);
    if (!ok) return;

    setRows((rs) => {
      const updated = rs.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            lessons: (course.lessons || []).filter((l) => l.id !== lessonId),
          };
        }
        return course;
      });
      localStorage.setItem("courses", JSON.stringify(updated));
      return updated;
    });
  };

  // Start editing lesson
  const handleEditLesson = (lesson) => {
    setEditingLessonId(lesson.id);
    setEditLessonValues({
      title: lesson.title,
      duration: lesson.duration,
      description: lesson.description,
    });
  };

  // Save lesson edits
  const handleSaveLessonEdit = (courseId, lessonId) => {
    setRows((rs) => {
      const updated = rs.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            lessons: (course.lessons || []).map((l) =>
              l.id === lessonId ? { ...l, ...editLessonValues } : l
            ),
          };
        }
        return course;
      });
      localStorage.setItem("courses", JSON.stringify(updated));
      return updated;
    });
    setEditingLessonId(null);
    setEditLessonValues({});
  };

  // Cancel lesson edit
  const handleCancelLessonEdit = () => {
    setEditingLessonId(null);
    setEditLessonValues({});
  };

  // Activate lesson
  const handleActivateLesson = (courseId, lessonId) => {
    setRows((rs) => {
      const updated = rs.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            lessons: (course.lessons || []).map((l) =>
              l.id === lessonId ? { ...l, status: "active" } : l
            ),
          };
        }
        return course;
      });
      localStorage.setItem("courses", JSON.stringify(updated));
      return updated;
    });
  };

  // Deactivate lesson
  const handleDeactivateLesson = (courseId, lessonId) => {
    setRows((rs) => {
      const updated = rs.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            lessons: (course.lessons || []).map((l) =>
              l.id === lessonId ? { ...l, status: "inactive" } : l
            ),
          };
        }
        return course;
      });
      localStorage.setItem("courses", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <NavBarDash />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 text-slate-900 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <section className="mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-[60%] relative">
                <input
                  type="search"
                  placeholder="Search courses, clients or category"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-12 rounded-full border border-orange-200 bg-white px-4 pl-12 text-sm outline-none focus:ring-2 focus:ring-[#ff8211] transition shadow-sm"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>
              </div>

              <div className="w-full sm:w-auto">
                <Link
                  to="/trainer/addcourse"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ff8211] text-white px-6 py-3 text-sm font-semibold shadow-md hover:bg-[#e67300] hover:shadow-lg transition-all"
                >
                  ➕ Add New Course
                </Link>
              </div>
            </div>
          </section>

          <div className="flex items-center my-6">
            <span className="flex-1 h-px bg-slate-200" />
            <h2 className="font-bebas text-2xl px-4 text-slate-900">Filter</h2>
            <span className="flex-1 h-px bg-slate-200" />
          </div>

          <section>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-4 md:gap-8 md:justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700">📂 Category:</span>
                  <select
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff8211] focus:ring-1 focus:ring-[#ff8211] bg-white"
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, category: e.target.value }))
                    }
                  >
                    <option>All</option>
                    <option>Strength Training</option>
                    <option>Bodybuilding</option>
                    <option>Cardio</option>
                    <option>Flexibility & Mobility</option>
                    <option>Nutrition</option>
                  </select>
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700">📈 Status:</span>
                  <select
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff8211] focus:ring-1 focus:ring-[#ff8211] bg-white"
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, status: e.target.value }))
                    }
                  >
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700">📅 Sort by:</span>
                  <select
                    className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff8211] focus:ring-1 focus:ring-[#ff8211] bg-white"
                    value={filters.sort}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, sort: e.target.value }))
                    }
                  >
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Title (A–Z)</option>
                  </select>
                </label>
              </div>
            </div>
          </section>

          <section>
            <div>
              <div className="mt-8 mb-6">
                <h2 className="font-bebas text-3xl text-slate-900">Courses List</h2>
              </div>

              <div className="w-full mt-6">
                <div className="overflow-x-auto bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <table className="w-full min-w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr className="text-sm text-slate-700 font-semibold">
                        <th className="px-4 py-3 text-left">Thumbnail</th>
                        <th className="px-4 py-3 text-left">Course Title</th>
                        <th className="px-4 py-3 text-left">Price</th>
                        <th className="px-4 py-3 text-left">Lesson</th>
                        <th className="px-4 py-3 text-left">Client</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {visibleRows.map((row) => (
                        <>
                          <tr key={row.id} className="border-b last:border-b-0">
                            <td className="px-4 py-4">
                              <div className="h-28 w-36 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                <img
                                  src={row.img}
                                  alt={row.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </td>

                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                {(row.lessons && row.lessons.length > 0) && (
                                  <button
                                    onClick={() => toggleCourseExpansion(row.id)}
                                    className="p-1 hover:bg-gray-100 rounded transition"
                                  >
                                    {expandedCourses.has(row.id) ? (
                                      <ChevronDown className="w-4 h-4 text-gray-600" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4 text-gray-600" />
                                    )}
                                  </button>
                                )}
                                {editingId === row.id ? (
                                  <input
                                    className="w-full rounded border border-border px-2 py-1 bg-background text-foreground"
                                    value={editValues.title || ""}
                                    onChange={(e) =>
                                      setEditValues((v) => ({
                                        ...v,
                                        title: e.target.value,
                                      }))
                                    }
                                  />
                                ) : (
                                  <Link
                                    to={`/trainer/courses/${row.id}`}
                                    className="text-blue-600 hover:underline"
                                  >
                                    {row.title}
                                  </Link>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              {editingId === row.id ? (
                                <input
                                  className="w-24 rounded border border-border px-2 py-1 bg-background text-foreground"
                                  value={editValues.price || ""}
                                  onChange={(e) =>
                                    setEditValues((v) => ({
                                      ...v,
                                      price: e.target.value,
                                    }))
                                  }
                                />
                              ) : (
                                `$${row.price || 0}`
                              )}
                            </td>

                            <td className="px-4 py-4">
                              {row.lessons ? row.lessons.length : 0}
                            </td>

                            <td className="px-4 py-4">
                              {editingId === row.id ? (
                                <input
                                  className="w-24 rounded border border-border px-2 py-1 bg-background text-foreground"
                                  value={editValues.client || ""}
                                  onChange={(e) =>
                                    setEditValues((v) => ({
                                      ...v,
                                      client: e.target.value,
                                    }))
                                  }
                                />
                              ) : (
                                row.client || 0
                              )}
                            </td>
                            <td className="px-4 py-4">
                              {editingId === row.id ? (
                                <select
                                  className="rounded border border-border px-2 py-1 bg-background text-foreground"
                                  value={editValues.status || row.status}
                                  onChange={(e) =>
                                    setEditValues((v) => ({
                                      ...v,
                                      status: e.target.value,
                                    }))
                                  }
                                >
                                  <option>Published</option>
                                  <option>Draft</option>
                                  <option>Archived</option>
                                </select>
                              ) : (
                                row.status
                              )}
                            </td>

                            <td className="px-4 py-4 text-center">
                              <div className="inline-flex items-center gap-4">
                                {editingId === row.id ? (
                                  <>
                                    <button
                                      type="button"
                                      className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline"
                                      onClick={() => {
                                        const payload = { ...editValues };

                                        const updatedRows = rows.map((r) =>
                                          r.id === row.id
                                            ? { ...r, ...payload }
                                            : r
                                        );
                                        setRows(updatedRows);

                                        localStorage.setItem(
                                          "courses",
                                          JSON.stringify(updatedRows)
                                        );

                                        window.dispatchEvent(
                                          new CustomEvent("courseStatusChanged", {
                                            detail: { ...row, ...payload },
                                          })
                                        );

                                        setEditingId(null);
                                        setEditValues({});
                                      }}
                                    >
                                      Save
                                    </button>
                                    <button
                                      type="button"
                                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline"
                                      onClick={() => {
                                        setEditingId(null);
                                        setEditValues({});
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
                                      aria-label={`Edit ${row.title}`}
                                      onClick={() => {
                                        setEditingId(row.id);
                                        setEditValues({
                                          title: row.title,
                                          client: row.client,
                                          status: row.status,
                                          price: row.price || "",
                                        });
                                      }}
                                    >
                                      <MdOutlineEdit />
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="inline-flex items-center gap-2 text-sm text-red-600 hover:underline"
                                      aria-label={`Delete ${row.title}`}
                                      onClick={() => {
                                        const ok = window.confirm(
                                          `Delete course "${row.title}"?`
                                        );
                                        if (!ok) return;

                                        setRows((rs) => {
                                          const updated = rs.filter(
                                            (r) => r.id !== row.id
                                          );
                                          localStorage.setItem(
                                            "courses",
                                            JSON.stringify(updated)
                                          );
                                          return updated;
                                        });
                                      }}
                                    >
                                      <IoIosTrash />
                                      Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>

                          {/* Expanded Lessons Row */}
                          {expandedCourses.has(row.id) && row.lessons && row.lessons.length > 0 && (
                            <tr className="bg-gray-50">
                              <td colSpan={7} className="px-4 py-4">
                                <div className="ml-8">
                                  <h4 className="font-semibold text-sm text-gray-700 mb-3">Lessons:</h4>
                                  <div className="space-y-2">
                                    {row.lessons.map((lesson) => (
                                      <div
                                        key={lesson.id}
                                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                                      >
                                        <div className="flex-1">
                                          {editingLessonId === lesson.id ? (
                                            <div className="space-y-2">
                                              <input
                                                className="w-full rounded border border-border px-2 py-1 text-sm"
                                                value={editLessonValues.title || ""}
                                                onChange={(e) =>
                                                  setEditLessonValues((v) => ({
                                                    ...v,
                                                    title: e.target.value,
                                                  }))
                                                }
                                                placeholder="Lesson title"
                                              />
                                              <input
                                                className="w-32 rounded border border-border px-2 py-1 text-sm"
                                                value={editLessonValues.duration || ""}
                                                onChange={(e) =>
                                                  setEditLessonValues((v) => ({
                                                    ...v,
                                                    duration: e.target.value,
                                                  }))
                                                }
                                                placeholder="Duration"
                                              />
                                            </div>
                                          ) : (
                                            <>
                                              <p className="font-medium text-sm text-gray-900">
                                                {lesson.title}
                                              </p>
                                              <p className="text-xs text-gray-500">
                                                Duration: {lesson.duration || "N/A"} |{" "}
                                                Status:{" "}
                                                <span
                                                  className={
                                                    lesson.status === "active"
                                                      ? "text-green-600 font-medium"
                                                      : "text-gray-400"
                                                  }
                                                >
                                                  {lesson.status || "inactive"}
                                                </span>
                                              </p>
                                            </>
                                          )}
                                        </div>

                                        <div className="flex items-center gap-2">
                                          {editingLessonId === lesson.id ? (
                                            <>
                                              <button
                                                onClick={() =>
                                                  handleSaveLessonEdit(row.id, lesson.id)
                                                }
                                                className="text-xs text-green-600 hover:underline px-2 py-1"
                                              >
                                                Save
                                              </button>
                                              <button
                                                onClick={handleCancelLessonEdit}
                                                className="text-xs text-gray-600 hover:underline px-2 py-1"
                                              >
                                                Cancel
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                onClick={() => handleEditLesson(lesson)}
                                                className="text-xs text-blue-600 hover:underline px-2 py-1 flex items-center gap-1"
                                              >
                                                <MdOutlineEdit className="w-3 h-3" />
                                                Edit
                                              </button>
                                              {lesson.status === "active" ? (
                                                <button
                                                  onClick={() =>
                                                    handleDeactivateLesson(row.id, lesson.id)
                                                  }
                                                  className="text-xs text-orange-600 hover:underline px-2 py-1 flex items-center gap-1"
                                                >
                                                  <Pause className="w-3 h-3" />
                                                  Deactivate
                                                </button>
                                              ) : (
                                                <button
                                                  onClick={() =>
                                                    handleActivateLesson(row.id, lesson.id)
                                                  }
                                                  className="text-xs text-green-600 hover:underline px-2 py-1 flex items-center gap-1"
                                                >
                                                  <Play className="w-3 h-3" />
                                                  Activate
                                                </button>
                                              )}
                                              <button
                                                onClick={() =>
                                                  handleDeleteLesson(
                                                    row.id,
                                                    lesson.id,
                                                    lesson.title
                                                  )
                                                }
                                                className="text-xs text-red-600 hover:underline px-2 py-1 flex items-center gap-1"
                                              >
                                                <IoIosTrash className="w-3 h-3" />
                                                Delete
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="py-6 text-center">
                <div className="inline-flex items-center gap-2">
                  <button
                    className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                  >
                    PREV
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition ${p === page ? "bg-[#ff8211] text-white" : "text-slate-700 hover:bg-slate-100"
                          }`}
                      >
                        {p}
                      </button>
                    );
                  })}

                  <button
                    className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <FooterDash />
    </>
  );
};

export default CoursesTrainerDash;

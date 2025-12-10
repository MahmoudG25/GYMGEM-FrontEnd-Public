import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Search, X, SlidersHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);

  // Pagination State
  const [hasServerPagination, setHasServerPagination] = useState(false);
  const [serverNextPage, setServerNextPage] = useState(null);

  // Filter States
  const [filters, setFilters] = useState({
    category: "",
    level: "",
    language: "",
    price_min: "",
    price_max: "",
    search: "",
    ordering: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [localPrice, setLocalPrice] = useState({ min: "", max: "" });

  const coursesPerPage = 9;

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handlePriceBlur = () => {
    setFilters(prev => ({
      ...prev,
      price_min: localPrice.min,
      price_max: localPrice.max
    }));
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/utils/categories');
      setCategories(response.data.results);
    } catch (error) {
      console.log("Failed to load categories");
    }
  };

  const fetchCourses = async (page = 1, append = false) => {
    if (!append) setIsLoading(true);
    const token = localStorage.getItem('access');

    try {
      // Clean params
      const params = { page: page }; // Add page param
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });

      const response = await axios.get('http://localhost:8000/api/courses/courses/for-trainees',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: params
        }
      );

      const data = response.data;

      // Determine response type (Paginated vs Array)
      if (data && Array.isArray(data.results)) {
        // Server-side pagination
        setHasServerPagination(true);
        setServerNextPage(data.next ? page + 1 : null);

        const newCourses = data.results;

        if (append) {
          setCourses(prev => [...prev, ...newCourses]);
          setDisplayedCourses(prev => [...prev, ...newCourses]);
        } else {
          setCourses(newCourses);
          setDisplayedCourses(newCourses);
        }

      } else if (Array.isArray(data)) {
        // Flat array fallback (Client-side pagination)
        setHasServerPagination(false);
        setServerNextPage(null);
        setCourses(data); // Store all

        if (!append) {
          // Reset client display logic
          setDisplayedCourses(data.slice(0, coursesPerPage));
          setCurrentPage(1);
        }
      } else {
        // Unexpected format, fallback to empty
        setCourses([]);
        setDisplayedCourses([]);
      }

    } catch (error) {
      console.log("Failed to fetch courses");
      // Optionally handle error state
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMoreCourses = () => {
    setIsLoadingMore(true);

    if (hasServerPagination) {
      // Fetch next page from server
      if (serverNextPage) {
        fetchCourses(serverNextPage, true);
      }
    } else {
      // Client-side pagination logic
      setTimeout(() => {
        const nextPage = currentPage + 1;
        const startIdx = nextPage * coursesPerPage - coursesPerPage;
        const endIdx = nextPage * coursesPerPage;

        setDisplayedCourses([...displayedCourses, ...courses.slice(startIdx, endIdx)]);
        setCurrentPage(nextPage);
        setIsLoadingMore(false);
      }, 300);
    }
  };

  // Check based on pagination type
  const hasMore = hasServerPagination
    ? !!serverNextPage
    : displayedCourses.length < courses.length;

  useEffect(() => {
    getCategories();
  }, []);

  // Initial fetch when filters change
  useEffect(() => {
    fetchCourses(1, false);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      category: "",
      level: "",
      language: "",
      price_min: "",
      price_max: "",
      search: "",
      ordering: ""
    });
    setLocalPrice({ min: "", max: "" });
  };

  // Generate category styles
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

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Navbar />
      <section className="w-full bg-background flex-1">
        <div className="mx-auto flex w-[90%] md:w-[85%] lg:w-[80%] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">

          {/* Header */}
          <header className="space-y-4 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Courses
            </p>
            <h1 className="font-bebas text-4xl tracking-tight text-[#ff8211] sm:text-5xl">
              Find your perfect fitness course
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg text-[#555555]">
              Explore curated programs for every ambition—from mindful mobility
              to high-energy conditioning—crafted by trusted GymGem coaches.
            </p>
          </header>

          {/* Search and Filters Bar */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">

              {/* Search */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8211]/20 focus:border-[#FF8211] transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                {/* Level */}
                <select
                  value={filters.level}
                  onChange={(e) => handleFilterChange("level", e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#FF8211] cursor-pointer"
                >
                  <option value="">All Levels</option>
                  <option value="1">Beginner</option>
                  <option value="2">Intermediate</option>
                  <option value="3">Advanced</option>
                </select>

                {/* Language */}
                <select
                  value={filters.language}
                  onChange={(e) => handleFilterChange("language", e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#FF8211] cursor-pointer"
                >
                  <option value="">All Languages</option>
                  <option value="EN">English</option>
                  <option value="AR">Arabic</option>
                </select>

                {/* Price Range */}
                <div className="flex items-center gap-2">
                  <div className="relative w-20">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                    <input
                      type="number"
                      placeholder="Min"
                      value={localPrice.min}
                      onChange={(e) => setLocalPrice(prev => ({ ...prev, min: e.target.value }))}
                      onBlur={handlePriceBlur}
                      onKeyDown={(e) => e.key === 'Enter' && handlePriceBlur()}
                      className="w-full pl-5 pr-2 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF8211]"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative w-20">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={localPrice.max}
                      onChange={(e) => setLocalPrice(prev => ({ ...prev, max: e.target.value }))}
                      onBlur={handlePriceBlur}
                      onKeyDown={(e) => e.key === 'Enter' && handlePriceBlur()}
                      className="w-full pl-5 pr-2 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF8211]"
                    />
                  </div>
                </div>

                {/* Ordering */}
                <div className="flex items-center">
                  <select
                    value={filters.ordering}
                    onChange={(e) => handleFilterChange("ordering", e.target.value)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-[#FF8211] cursor-pointer"
                  >
                    <option value="">Sort By</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="-created_at">Newest First</option>
                    <option value="created_at">Oldest First</option>
                  </select>
                </div>

                {/* Clear Filters */}
                {Object.values(filters).some(Boolean) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500 hover:text-red-600 font-medium px-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Filter by category:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {categoryOptions.map((option) => {
                  const isActive = (filters.category === "" && option.id === "") || (filters.category === option.id);
                  return (
                    <button
                      key={option.id || "all"}
                      type="button"
                      onClick={() => handleFilterChange("category", option.id)}
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-in-out ${isActive
                        ? option.activeColor
                        : `${option.bgColor} ${option.textColor} ${option.hoverColor}`
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95`}
                    >
                      <span className="text-sm leading-none">{option.icon}</span>
                      <span>{option.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="w-full bg-background pb-20">
        <div className="mx-auto grid w-[90%] md:w-[85%] lg:w-[80%] gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {isLoading ? (
            // Skeleton loading state
            [...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm animate-pulse"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-200" />
                <div className="flex flex-1 flex-col gap-6 p-6">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-20" />
                    <div className="h-10 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              </div>
            ))
          ) : displayedCourses.length > 0 ? (
            displayedCourses.map((item) => {
              const theme = categoryOptions.find(opt => opt.id === item.category);
              return (
                <CourseCard
                  key={item.id || item.title}
                  course={item}
                  categoryTheme={theme}
                />
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-[#FF8211] font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && !isLoading && (
          <div className="mx-auto w-[80%] flex justify-center mt-12 px-4">
            <button
              onClick={loadMoreCourses}
              disabled={isLoadingMore}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff8211] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#e97108] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Courses"
              )}
            </button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Courses;

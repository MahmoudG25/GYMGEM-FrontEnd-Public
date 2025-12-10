import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, Award, Globe, ShoppingBag, CheckCircle, ArrowRight } from "lucide-react";
import NavTraineDash from "../../Dashboard/Traine/NavTraineDash";
import { isUserEnrolled } from "../../BuyNow/Checkout";

// ============================================================================
// FAVORITES MANAGEMENT LOGIC
// All localStorage operations for managing course favorites
// ============================================================================

const FAVORITES_KEY = 'favorites_courses';

/**
 * Get all favorite courses from localStorage
 * @returns {Array} Array of favorite course objects
 */
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

/**
 * Add a course to favorites
 * @param {Object} course - Course object to add
 * @returns {boolean} Success status
 */
export const addToFavorites = (course) => {
  try {
    const favorites = getFavorites();
    
    // Check if course is already in favorites
    const exists = favorites.some(fav => String(fav.id) === String(course.id));
    if (exists) {
      console.log('Course already in favorites');
      return false;
    }
    
    // Add course to favorites
    favorites.push(course);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

/**
 * Remove a course from favorites by ID
 * @param {string|number} courseId - ID of the course to remove
 * @returns {boolean} Success status
 */
export const removeFromFavorites = (courseId) => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => String(fav.id) !== String(courseId));
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

/**
 * Check if a course is in favorites
 * @param {string|number} courseId - ID of the course to check
 * @returns {boolean} True if course is in favorites
 */
export const isFavorite = (courseId) => {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => String(fav.id) === String(courseId));
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// ============================================================================
// FAVORITE COMPONENT
// Displays all saved courses with management options
// ============================================================================

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user and favorites on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    loadFavorites();
  }, []);

  // Load favorites from localStorage
  const loadFavorites = () => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  };

  // Remove a course from favorites and refresh the list
  const handleRemoveFavorite = (courseId) => {
    removeFromFavorites(courseId);
    loadFavorites();
  };

  // Check if course is purchased
  const isPurchased = (courseId) => {
    if (!currentUser) return false;
    return isUserEnrolled(currentUser.id, courseId);
  };

  return (
    <>
      <NavTraineDash />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 bebas-regular mb-2">
              My Favorites
            </h1>
            <p className="text-gray-600 poppins-regular">
              Courses you've saved for later
            </p>
          </div>

          {/* Favorites Grid */}
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((course) => {
                const purchased = isPurchased(course.id);
                return (
                <div
                  key={course.id}
                  className={`rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ${
                    purchased
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Course Image */}
                  <div className="relative">
                    <img
                      src={course.img || "https://via.placeholder.com/400x225"}
                      alt={course.title}
                      className={`w-full h-48 object-cover ${
                        purchased ? 'opacity-90' : ''
                      }`}
                    />
                    {/* Purchased Badge */}
                    {purchased && (
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold poppins-regular flex items-center gap-1.5 shadow-lg">
                        <CheckCircle className="w-4 h-4" />
                        Purchased
                      </div>
                    )}
                    {/* Remove from Favorites Button */}
                    <button
                      onClick={() => handleRemoveFavorite(course.id)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-[#FF8211] hover:text-white transition-colors group"
                      aria-label="Remove from favorites"
                    >
                      <Heart className="w-5 h-5 fill-[#FF8211] text-[#FF8211] group-hover:fill-white group-hover:text-white transition-colors cursor-pointer" />
                    </button>
                  </div>

                  {/* Course Content */}
                  <div className="p-5">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-[#FF8211]/10 text-[#FF8211] rounded-lg text-xs font-medium poppins-regular">
                        {course.category || "Fitness"}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium poppins-regular flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {course.level || "Beginner"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 bebas-regular mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 poppins-regular text-sm mb-4 line-clamp-2">
                      {course.description || "Master the fundamentals and transform your approach to fitness"}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="flex text-[#FF8211]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" strokeWidth={0} />
                          ))}
                        </div>
                        <span className="text-gray-700 poppins-regular ml-1">4.8</span>
                      </div>
                      {course.language && (
                        <div className="flex items-center gap-1 text-gray-600 poppins-regular">
                          <Globe className="w-3 h-3" />
                          <span>{course.language}</span>
                        </div>
                      )}
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      {purchased ? (
                        <>
                          <div className="flex items-center gap-2 text-green-700 poppins-medium text-sm">
                            <CheckCircle className="w-5 h-5" />
                            <span>You own this course</span>
                          </div>
                          <Link
                            to={`/courses/${course.id}/learn`}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium poppins-regular text-sm hover:bg-green-700 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
                          >
                            Start Learning
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </>
                      ) : (
                        <>
                          <div>
                            <span className="text-2xl font-bold text-[#FF8211] bebas-regular">
                              ${course.price || "49.99"}
                            </span>
                          </div>
                          <Link
                            to={`/courses/${course.id}`}
                            className="px-4 py-2 bg-[#FF8211] text-white rounded-lg font-medium poppins-regular text-sm hover:bg-[#ff7906] transition-colors shadow-sm cursor-pointer"
                          >
                            View Details
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )})}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 bebas-regular mb-3">
                No favorites yet
              </h2>
              <p className="text-gray-600 poppins-regular mb-6 text-center max-w-md">
                Start adding courses to your favorites to keep track of the ones you're interested in!
              </p>
              <Link
                to="/courses"
                className="px-6 py-3 bg-[#FF8211] text-white rounded-lg font-semibold bebas-regular text-lg hover:bg-[#ff7906] transition-colors shadow-sm flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Courses
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorite;

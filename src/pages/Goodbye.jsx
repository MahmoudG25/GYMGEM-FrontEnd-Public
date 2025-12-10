import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, RotateCcw } from "lucide-react";

const Goodbye = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to login after 5 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-200 rounded-full blur-xl opacity-50"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-white fill-white" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-bebas tracking-tight">
          We'll Miss You!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-8">
          Your account has been permanently deleted. All your data has been securely removed from our servers.
        </p>

        {/* Info Box */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
          <p className="text-sm text-red-700">
            If you change your mind, you can always create a new account by signing up again. Your journey with GymGem can start anew!
          </p>
        </div>

        {/* Redirect Info */}
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to login in <span className="font-semibold text-gray-700">5 seconds</span>...
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ff8211] to-[#ff9a42] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
        >
          <RotateCcw className="w-5 h-5" />
          Go to Login
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-8">
          © 2025 GymGem. Thank you for being part of our community.
        </p>
      </div>
    </div>
  );
};

export default Goodbye;

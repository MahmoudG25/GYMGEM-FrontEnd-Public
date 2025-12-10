// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Cover_img from "../../assets/fitCartoon3.png";
import axios from "axios";
import GoogleLogin from "../../components/GoogleLogin.jsx";
import { Loader2 } from "lucide-react";
import { useToast } from "../../context/ToastContext";

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Google sign-in handled by `GoogleLogin` component.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Google sign-in is handled by `GoogleLogin` component which posts the id_token.
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const IsEmail = isValidEmail(emailOrUsername);
      const payload = { password };

      if (IsEmail) {
        payload.email = emailOrUsername;
      } else {
        payload.username = emailOrUsername;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        payload
      );

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      console.log(response.data)
      localStorage.setItem("user", JSON.stringify(response.data.account));

      console.log("Response:", response.data);
      showToast("Sign in successful!", { type: "success" });
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      showToast("Login failed. Please try again.", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-12 sm:px-8 lg:px-12">
        <div className="grid overflow-hidden rounded-[24px] border border-border bg-card shadow-sm lg:min-h-[640px] lg:grid-cols-2">
          {/* ========== Form ========== */}
          <div className="order-2 flex flex-col justify-center px-6 py-10 sm:px-10 lg:order-1 lg:px-12">
            <div className="mx-auto w-full max-w-sm space-y-8">
              <header className="space-y-3 text-center lg:text-left">
                <h1 className="font-bebas text-3xl tracking-tight sm:text-4xl">
                  Welcome back
                </h1>
                <p className="text-sm text-muted-foreground">
                  Sign in to pick up your training plan where you left off.
                </p>
              </header>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="emailOrUsername"
                    className="text-sm font-medium text-foreground"
                  >
                    Email or username
                  </label>
                  <input
                    id="emailOrUsername"
                    type="text"
                    placeholder="Enter your email or username"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                    disabled={isLoading}
                    className={`h-11 w-full rounded-xl border border-border bg-background/90 px-4 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-medium text-foreground">
                    <label htmlFor="password">Password</label>
                    <a
                      href="#"
                      className="text-xs font-semibold text-primary transition hover:text-primary/80"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className={`h-11 w-full rounded-xl border border-border bg-background/90 px-4 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className={`absolute inset-y-0 right-3 flex items-center text-muted-foreground transition ${isLoading ? 'pointer-events-none' : 'hover:text-foreground'}`}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#ff8211] px-4 text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-primary hover:text-primary/80"
                  >
                    Join GymGem
                  </Link>
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  or
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className={`${isLoading ? 'pointer-events-none opacity-60' : ''}`}>
                  <GoogleLogin onStart={() => setIsLoading(true)} onComplete={() => setIsLoading(false)} />
                </div>
              </div>
            </div>
          </div>

          {/* ========== Visual Panel ========== */}
          <div className="relative hidden bg-muted lg:block">
            <img
              src={Cover_img}
              alt="GymGem login"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/20 to-transparent" />
            <div className="relative flex h-full items-end justify-start p-10">
              <div className="max-w-xs space-y-2 rounded-2xl bg-background/80 p-4 text-sm text-muted-foreground shadow-lg backdrop-blur">
                <p className="font-semibold text-foreground">
                  Stay consistent.
                </p>
                <p>
                  Your sessions, nutrition, and progress are all in one calm
                  workspace designed to keep you moving forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;

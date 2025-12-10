// src/pages/SignUpPage.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import cover_img from "../../assets/cover.svg";
import axios from "axios";
import GoogleLogin from "../../components/GoogleLogin";
import { useToast } from "../../context/ToastContext";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      // Send POST request to backend
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/",
        data
      );
      console.log("Response:", response.data);
      showToast("Sign up successful!", { type: "success" });
      navigate("/role");
    } catch (error) {
      console.error("Error during registration:", error);
      showToast("Registration failed. Please try again.", { type: "error" });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-4 py-12 sm:px-8 lg:px-12">
        <div className="grid overflow-hidden rounded-[24px] border border-border bg-card shadow-sm lg:min-h-[720px] lg:grid-cols-2">
          {/* ========== Illustration  ========== */}
          <div className="relative hidden bg-muted lg:block">
            <img
              src={cover_img}
              alt="GymGem signup"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-primary/10 to-transparent" />
            <div className="relative flex h-full items-end justify-start p-10">
              <div className="max-w-xs space-y-2 rounded-2xl bg-background/80 p-4 text-sm text-muted-foreground shadow-lg backdrop-blur">
                <p className="font-semibold text-foreground">
                  <span className="text-[#f0e1da]">Create your </span>
                  GymGem account.
                </p>
                <p>
                  Trainers, gyms, stores, and trainees all connect in one simple
                  workspace tailored to your goals.
                </p>
              </div>
            </div>
          </div>

          {/* ========== Form  ========== */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
            <div className="mx-auto w-full max-w-md space-y-8">
              <header className="space-y-3 text-center lg:text-left">
                <h1 className="font-bebas text-3xl tracking-tight sm:text-4xl">
                  Join the GymGem community
                </h1>
                <p className="text-sm text-muted-foreground">
                  Tell us a little about you to unlock tailored training and
                  nutrition support.
                </p>
              </header>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-foreground"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter your first name"
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                      })}
                      className="h-11 w-full rounded-xl border border-border bg-background/90 px-4 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-foreground"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter your last name"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      className="h-11 w-full rounded-xl border border-border bg-background/90 px-4 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-foreground"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "At least 3 characters",
                      },
                    })}
                    className="h-11 w-full rounded-xl border border-border bg-background/90 px-4 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                  />
                  {errors.username && (
                    <p className="text-xs text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please use a valid email address",
                      },
                    })}
                    className="h-11 w-full rounded-xl border border-border bg-background/90 px-4 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-foreground"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                          message:
                            "Use at least 8 characters with upper, lower, and a number",
                        },
                      })}
                      className="h-11 w-full rounded-xl border border-border bg-background/90 px-4 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground transition hover:text-foreground"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-foreground"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (val) =>
                          val === watch("password") || "Passwords do not match",
                      })}
                      className="h-11 w-full rounded-xl border border-border bg-background/90 px-4 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-3 flex items-center text-muted-foreground transition hover:text-foreground"
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#ff8211] px-4 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
                >
                  Create account
                </button>
              </form>

              <div className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-primary hover:text-primary/80"
                  >
                    Sign in
                  </Link>
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  or
                  <div className="h-px flex-1 bg-border" />
                </div>

                <GoogleLogin signType={'signup'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUpPage;

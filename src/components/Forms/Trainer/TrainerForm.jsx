import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const Trainerform = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { showToast } = useToast();

  const onSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const payload = { ...data, account_id: user.id };
    console.log(payload);
    const token = localStorage.getItem('access');
    try {
      // Send POST request to backend
      const response = await axios.post(
        "http://127.0.0.1:8000/api/trainers/create",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response:", response.data);
      showToast("trainer successful!", { type: "success" });
      navigate("/trainerSpecialization");
    } catch (error) {
      console.error("Error during registration:", error);
      showToast("failed. Please try again.", { type: "error" });
    }
  };

  return (
    <section className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header className="text-center">
          <h2 className="font-bebas text-4xl tracking-tight text-[#ff8211]">
            Trainer profile
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base text-[#555555]">
            Tell us about yourself so we can tailor GymGem to your coaching
            style.
          </p>
        </header>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="text-sm font-medium text-foreground"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  {...register("gender", {
                    required: "Please select your gender",
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-xs text-destructive">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="dob"
                  className="text-sm font-medium text-foreground"
                >
                  Date of birth
                </label>
                <input
                  id="dob"
                  type="date"
                  {...register("dob", {
                    required: "Date of birth is required",
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.dob && (
                  <p className="text-xs text-destructive">
                    {errors.dob.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-foreground"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Phone must be 10–15 digits",
                    },
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="country"
                  className="text-sm font-medium text-foreground"
                >
                  Country
                </label>
                <input
                  id="country"
                  placeholder="Where are you based?"
                  {...register("country", { required: "Country is required" })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                />
                {errors.country && (
                  <p className="text-xs text-destructive">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="zip"
                  className="text-sm font-medium text-foreground"
                >
                  ZIP / Postal code
                </label>
                <input
                  id="zip"
                  placeholder="Enter your ZIP code"
                  {...register("zip", {
                    required: "ZIP code is required",
                    pattern: {
                      value: /^[0-9]{4,6}$/,
                      message: "Invalid ZIP code format",
                    },
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                />
                {errors.zip && (
                  <p className="text-xs text-destructive">
                    {errors.zip.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex   h-11 items-center justify-center rounded-xl bg-[#ff8211] px-6 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Trainerform;

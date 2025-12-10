import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const Trainerexp = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { showToast } = useToast();



  const onSubmit = async (data) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const payload = { ...data, account_id: user.id };
    console.log(payload)
    // ✅ No need to get token manually - axiosInstance handles it!
    try {
      // Send POST request to backend
      const response = await axiosInstance.post("/api/trainers/experiences", payload);
      console.log("Response:", response.data);
      showToast("trainer successful!", { type: "success" });
      navigate("/");
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
            Trainer Experience
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base text-[#555555]">
            Share your professional background with us.
          </p>
        </header>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Work Place */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Work Place
                </label>
                <input
                  placeholder="Enter your workplace"
                  {...register("work_place", { required: "Work place is required" })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                />
                {errors.work_place && (
                  <p className="text-xs text-destructive">
                    {errors.work_place.message}
                  </p>
                )}
              </div>

              {/* Position */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Position
                </label>
                <input
                  placeholder="Enter your position"
                  {...register("position", { required: "Position is required" })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                />
                {errors.position && (
                  <p className="text-xs text-destructive">
                    {errors.position.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Start Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Start Date
                </label>
                <input
                  type="date"
                  {...register("start_date", { required: "Start date is required" })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.start_date && (
                  <p className="text-xs text-destructive">
                    {errors.start_date.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  End Date
                </label>
                <input
                  type="date"
                  {...register("end_date")}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                placeholder="Describe your work experience"
                {...register("description")}
                className="min-h-[120px] w-full rounded-xl border border-border bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground resize-y"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4 mt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-input bg-background px-6 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Skip
              </button>
              <button
                type="submit"
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#ff8211] px-6 text-sm font-semibold text-white transition hover:bg-[#ff8211]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Trainerexp;

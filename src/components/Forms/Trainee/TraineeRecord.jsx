import { useForm } from "react-hook-form";

import { useToast } from "../../../context/ToastContext";
import { useNavigate } from "react-router-dom";


const TraineeRecordForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { showToast } = useToast();

  const onSubmit = (data) => {
    console.log("Trainee Record Data:", data);
    showToast("Record submitted successfully!", { type: "success" });
  };

  return (
    <section className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
        <header className="text-center">
          <h2 className="font-bebas text-4xl tracking-tight text-[#ff8211]">
            Trainee Record
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base text-[#555555]">
            Enter your initial body measurements to track your progress.
          </p>
        </header>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Record Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Record Date
                </label>
                <input
                  type="date"
                  {...register("record_date", {
                    required: "Record date is required",
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.record_date && (
                  <p className="text-xs text-destructive">
                    {errors.record_date.message}
                  </p>
                )}
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("weight", {
                    required: "Weight is required",
                    min: { value: 20, message: "Too low" },
                    max: { value: 350, message: "Too high" },
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.weight && (
                  <p className="text-xs text-destructive">
                    {errors.weight.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Height */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Height (cm)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("height", {
                    required: "Height is required",
                    min: { value: 50, message: "Too low" },
                    max: { value: 250, message: "Too high" },
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.height && (
                  <p className="text-xs text-destructive">
                    {errors.height.message}
                  </p>
                )}
              </div>

              {/* Body Fat */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Body Fat %
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("body_fat_percentage", {
                    required: "Body fat percentage is required",
                    min: { value: 1, message: "Too low" },
                    max: { value: 70, message: "Too high" },
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.body_fat_percentage && (
                  <p className="text-xs text-destructive">
                    {errors.body_fat_percentage.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Muscle Mass */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Muscle Mass (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("muscle_mass", {
                    required: "Muscle mass is required",
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.muscle_mass && (
                  <p className="text-xs text-destructive">
                    {errors.muscle_mass.message}
                  </p>
                )}
              </div>

              {/* Bone Mass */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Bone Mass (kg)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("bone_mass", { required: "Bone mass is required" })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.bone_mass && (
                  <p className="text-xs text-destructive">
                    {errors.bone_mass.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Body Water */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Body Water %
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("body_water_percentage", {
                    required: "Body water percentage is required",
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.body_water_percentage && (
                  <p className="text-xs text-destructive">
                    {errors.body_water_percentage.message}
                  </p>
                )}
              </div>

              {/* BMR */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  BMR
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("BMR", {
                    required: "BMR is required",
                  })}
                  className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                />
                {errors.BMR && (
                  <p className="text-xs text-destructive">
                    {errors.BMR.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-4">
              {/* Skip Button */}
              <button
                type="button"
                onClick={() => navigate("/traine/profile")}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-input bg-background px-6 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Skip
              </button>

              {/* Submit Button */}
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

export default TraineeRecordForm;

import { useState } from "react";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import traineeIcon from "../assets/trainer1.png";
import trainerIcon from "../assets/1trainer.png";
import gymIcon from "../assets/weight.png";
import storeIcon from "../assets/store.png";
import nutritionIcon from "../assets/nutritionist.png";

const roles = [
  {
    id: "trainee",
    title: "Trainee",
    description:
      "Find trainers, programs, and nutrition plans tailored to your pace.",
    icon: traineeIcon,
  },
  {
    id: "trainer",
    title: "Trainer",
    description:
      "Create programs, guide trainees, and manage your sessions with ease.",
    icon: trainerIcon,
  },
  {
    id: "gym",
    title: "Gym",
    description:
      "Manage facilities, trainers, and memberships from one calm dashboard.",
    icon: gymIcon,
  },
  {
    id: "store",
    title: "Store",
    description:
      "Showcase verified products, supplements, and gear to the GymGem community.",
    icon: storeIcon,
  },
  {
    id: "nutrition",
    title: "Nutrition Specialist",
    description:
      "Offer meal plans and ongoing nutrition support to motivated clients.",
    icon: nutritionIcon,
  },
];

// const userProfileTypes = JSON.parse(localStorage.getItem("user"))?.profiles.map(profile => profile.type) || [];
const userProfileTypes = JSON.parse(localStorage.getItem("user"))?.profiles?.map(profile => profile.type) || [];

const Selectrole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const { showToast } = useToast();

  const onSubmit = async () => {
    if (!selectedRole) {
      showToast("Please select a role first!", { type: "error" });

      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = { profile_type: selectedRole };
      // ✅ No manual token management needed!
      const refresh = localStorage.getItem("refresh")


      const response = await axiosInstance.post(
        "/api/profiles/create",
        payload
      );

      const refreshResp = await axiosInstance.post(
        "/api/auth/renew-refresh", { profile_id: response.data.id },
        {
          headers: { refresh: `${refresh}` },
        }
      );

      console.log("refreshresponse:", refreshResp);

      localStorage.setItem('access', refreshResp.data.access)
      localStorage.setItem('refresh', refreshResp.data.refresh)
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      updatedUser.profiles.push({ type: response.data.profile_type, id: response.data.id });
      localStorage.setItem("user", JSON.stringify(updatedUser));

      showToast(`${selectedRole} profile created successfully!`, { type: "success" });

      if (selectedRole === "trainer") navigate("/trainerform");
      else if (selectedRole === "trainee") navigate("/traineeform");
      else navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      showToast("Failed. Please try again.", { type: "error" });
    }
  };

  return (
    <section className="min-h-screen bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8 w-full">
      <div className="mx-auto flex w-[80%]  flex-col gap-10">
        <header className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Choose your role
          </p>
          <h1 className="font-bebas text-4xl tracking-tight sm:text-5xl text-[#ff8211]">
            Tell us how you want to use GymGem
          </h1>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground  text-[#555555] sm:text-lg">
            Select the workspace that matches your goals. You can always add
            more roles later to collaborate across training, nutrition, and
            commerce.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {console.log("userProfileTypes:", userProfileTypes)}
          {
            roles.map((role) => {
              const isSelected = role.id === selectedRole;
              const isActive = !userProfileTypes.includes(role.id);
              console.log(`Role: ${role.id}, isActive: ${isActive}`);
              return (
                <button
                  key={role.id}
                  type="button"
                  disabled={!isActive}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group flex h-full flex-col justify-between rounded-3xl border border-border bg-card/80 p-6 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${!isActive ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:-translate-y-1 hover:shadow-md hover:bg-[#ff8211] hover:text-white"
                    } ${isSelected && isActive ? "bg-[#ff8211] text-white" : ""
                    }`}
                >
                  <div className="space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <img
                        src={role.icon}
                        alt={role.title}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-bebas text-2xl text-foreground">
                        {role.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`pt-4 text-sm font-semibold transition ${isSelected && isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                      }`}
                  >
                    {isSelected && isActive ? "Selected" : "Select"} →
                  </span>
                </button>
              );
            })}
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={onSubmit}
            disabled={!selectedRole}
            className="cursor-pointer inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl bg-[#ff8211] px-6 text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm role
          </button>
        </div>
      </div>
    </section>
  );
};

export default Selectrole;

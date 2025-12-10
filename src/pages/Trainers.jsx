import CardForTrainers from "../components/Trainee/CardForTrainers";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";

function Trainers() {
  const [selectedFilter, setSelectedFilter] = useState("All Trainers");

  const filterOptions = [
    {
      label: "All Trainers",
      icon: "✨",
      bgColor: "bg-muted",
      textColor: "text-muted-foreground",
      hoverColor: "hover:bg-primary/10 hover:text-primary hover:shadow-sm",
      activeColor:
        "bg-primary/10 text-primary shadow-sm ring-2 ring-primary/20",
    },
    {
      label: "Mobility & Yoga",
      icon: "🧘",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      hoverColor: "hover:bg-green-100 hover:shadow-md hover:-translate-y-0.5",
      activeColor:
        "bg-green-100 text-green-800 shadow-md ring-2 ring-green-300",
    },
    {
      label: "Strength & Conditioning",
      icon: "🏋️",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      hoverColor: "hover:bg-blue-100 hover:shadow-md hover:-translate-y-0.5",
      activeColor: "bg-blue-100 text-blue-800 shadow-md ring-2 ring-blue-300",
    },
    {
      label: "Boxing & MMA",
      icon: "🥊",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      hoverColor: "hover:bg-red-100 hover:shadow-md hover:-translate-y-0.5",
      activeColor: "bg-red-100 text-red-800 shadow-md ring-2 ring-red-300",
    },
    {
      label: "Nutrition & Wellness",
      icon: "🥗",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      hoverColor: "hover:bg-amber-100 hover:shadow-md hover:-translate-y-0.5",
      activeColor:
        "bg-amber-100 text-amber-800 shadow-md ring-2 ring-amber-300",
    },
    {
      label: "Recovery Specialists",
      icon: "💆",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      hoverColor: "hover:bg-purple-100 hover:shadow-md hover:-translate-y-0.5",
      activeColor:
        "bg-purple-100 text-purple-800 shadow-md ring-2 ring-purple-300",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <section className="w-full bg-background">
        <div className="mx-auto flex w-[80%] flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary ">
              Trainers
            </p>
            <h1 className="font-bebas text-4xl tracking-tight text-foreground sm:text-5xl text-[#ff8211]">
              Find your perfect coach
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg text-[#555555]">
              Connect with certified professionals who design programs around
              your pace, your goals, and your schedule.
            </p>
          </header>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              Filter by category:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {filterOptions.map((option) => {
                const isActive = selectedFilter === option.label;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setSelectedFilter(option.label)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-in-out ${
                      isActive
                        ? option.activeColor
                        : `${option.bgColor} ${option.textColor} ${option.hoverColor}`
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95`}
                  >
                    <span className="text-sm leading-none">{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <CardForTrainers />
      </section>
      <Footer />
    </div>
  );
}

export default Trainers;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TraineesCardData from "../js/TraineesCardData";
import { Link } from "react-router-dom";
import { useState } from "react";

function Trainees() {
  const [selectedFilter, setSelectedFilter] = useState("All Requests");

  const filterOptions = [
    {
      label: "All Requests",
      icon: "✨",
      bgColor: "bg-muted",
      textColor: "text-muted-foreground",
      hoverColor: "hover:bg-primary/10 hover:text-primary hover:shadow-sm",
      activeColor:
        "bg-primary/10 text-primary shadow-sm ring-2 ring-primary/20",
    },
    {
      label: "Weight Loss",
      icon: "🏃",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      hoverColor: "hover:bg-orange-100 hover:shadow-md hover:-translate-y-0.5",
      activeColor:
        "bg-orange-100 text-orange-800 shadow-md ring-2 ring-orange-300",
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
      label: "Mobility & Yoga",
      icon: "🧘",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      hoverColor: "hover:bg-green-100 hover:shadow-md hover:-translate-y-0.5",
      activeColor:
        "bg-green-100 text-green-800 shadow-md ring-2 ring-green-300",
    },
    {
      label: "Nutrition Support",
      icon: "🥗",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      hoverColor: "hover:bg-amber-100 hover:shadow-md hover:-translate-y-0.5",
      activeColor:
        "bg-amber-100 text-amber-800 shadow-md ring-2 ring-amber-300",
    },
    {
      label: "Accountability Coaching",
      icon: "📋",
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Trainee requests
            </p>
            <h1 className="font-bebas text-4xl tracking-tight text-foreground sm:text-5xl text-[#ff8211]">
              Connect with trainees who need your expertise
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg text-[#555555]">
              Browse personalized goals and reach out to clients looking for
              coaching, accountability, and structured support.
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
      </section>

      <section className="w-full bg-background pb-20">
        <div className="mx-auto flex w-[80%] flex-col gap-6 px-4 sm:px-6 lg:px-8">
          {TraineesCardData.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
                <div className="max-w-3xl space-y-3">
                  <h2 className="font-bebas text-2xl text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  <dl className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="location">
                        📍
                      </span>
                      <span className="font-medium text-foreground">
                        Location:
                      </span>
                      <span>{item.Location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="duration">
                        🕒
                      </span>
                      <span className="font-medium text-foreground">
                        Duration:
                      </span>
                      <span>{item.Duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span role="img" aria-label="goal">
                        💪
                      </span>
                      <span className="font-medium text-foreground">Goal:</span>
                      <span>{item.Goal}</span>
                    </div>
                  </dl>
                </div>

                <div className="flex shrink-0 items-center justify-start sm:justify-end">
                  <Link
                    to="/requestdetails"
                    className="inline-flex items-center justify-center rounded-xl bg-[#FF8211] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#A3D9A5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Apply now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Trainees;

import Hero1 from "../../assets/hero.mp4";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function HeroSc() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Hero is visible on page load
    setIsVisible(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-background via-orange-50/30 to-background text-foreground w-full"
    >
      <div className="w-[80%] mx-auto">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            className="h-full w-full object-cover opacity-80"
          >
            <source src={Hero1} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-orange-900/20 to-background/70" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6">
          <h1
            className={`font-bebas text-4xl tracking-tight text-foreground transition-all duration-1000 ease-out sm:text-5xl lg:text-6xl ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
          >
            Your fitness network starts here
          </h1>
          <p
            className={`max-w-2xl text-base text-muted-foreground transition-all duration-1000 delay-200 ease-out sm:text-lg ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
          >
            Find certified personal trainers, book classes, and stay accountable
            to your goals with a calm all-in-one experience designed for
            trainers, gyms, stores, and trainees.
          </p>

          <div
            className={`flex flex-col items-center gap-3 transition-all duration-1000 delay-300 ease-out sm:flex-row ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
          >
            <button
              onClick={() => navigate("/Trainers")}
              className="inline-flex h-12 min-w-[180px] items-center bg-gradient-to-r from-[#ff8211] to-orange-600 text-white justify-center rounded-xl px-6 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background group relative"
            >
              Find a trainer
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex h-12 min-w-[180px] items-center justify-center bg-gradient-to-r from-white to-gray-100 rounded-xl border-2 border-[#ff8211] px-6 text-sm font-semibold text-[#ff8211] shadow-md transition-all duration-300 hover:scale-110 hover:from-orange-50 hover:to-orange-100 hover:shadow-lg hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Join as a trainer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSc;

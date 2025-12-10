import { Check, Clock, Dumbbell } from "lucide-react";
import traineesImg from "../../assets/trainees.jpg";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

function ForTrainees() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-r from-blue-50/40 via-background to-cyan-50/40 py-20">
      <div className="mx-auto flex w-[80%] flex-col overflow-hidden rounded-[32px] border-2 border-cyan-200 bg-gradient-to-br from-white via-blue-50/20 to-white shadow-lg lg:flex-row">
        <div
          className={`flex flex-1 flex-col justify-center gap-10 px-6 py-12 transition-all duration-700 ease-out sm:px-10 lg:px-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              For trainees
            </p>
            <h3 className="font-bebas text-3xl tracking-tight text-foreground sm:text-4xl text-[#FF8211]">
              Everything you need to reach your fitness goals
            </h3>
            <p className="text-base text-muted-foreground sm:text-lg text-[#555555]">
              Work with experts, join flexible sessions, and discover the best
              gyms in one calm experience tailored to your energy and pace.
            </p>
          </header>

          <dl className="space-y-6">
            <div
              className={`flex gap-4 transition-all duration-500 delay-100 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 hover:scale-110">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <dt className="text-sm font-semibold text-foreground">
                  Personalized training plans
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Work with certified trainers who tailor each session to your
                  goals and schedule.
                </dd>
              </div>
            </div>
            <div
              className={`flex gap-4 transition-all duration-500 delay-200 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 hover:scale-110">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <dt className="text-sm font-semibold text-foreground">
                  Flexible classes
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Join live or on-demand sessions anytime, from anywhere that
                  feels comfortable.
                </dd>
              </div>
            </div>
            <div
              className={`flex gap-4 transition-all duration-500 delay-300 ease-out ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-4 opacity-0"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/40 text-foreground transition-transform duration-300 hover:scale-110">
                <Dumbbell className="h-4 w-4" />
              </div>
              <div>
                <dt className="text-sm font-semibold text-foreground">
                  Access to top gyms
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Explore curated gyms and studios, compare amenities, and book
                  in just a few taps.
                </dd>
              </div>
            </div>
          </dl>

          <div
            className={`flex justify-start transition-all duration-500 delay-400 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-4 opacity-0"
            }`}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#FF8211] font-semibold text-primary transition-all duration-300 hover:gap-3 hover:text-primary/80"
            >
              Find your trainer now
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>

        <div
          className={`relative h-80 w-full flex-1 transition-all duration-700 delay-300 ease-out lg:h-auto ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-background/0 to-background/40" />
          <img
            src={traineesImg}
            alt="GymGem trainees"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default ForTrainees;

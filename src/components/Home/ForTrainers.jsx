import { Check, Clock, Dumbbell } from "lucide-react";
import traineesImg2 from "../../assets/333333333333333333.jpg";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

function ForTrainers() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-r from-purple-50/40 via-background to-pink-50/40 py-20">
      <div className="mx-auto flex w-[80%]  flex-col overflow-hidden rounded-[32px] border-2 border-purple-200 bg-gradient-to-br from-white via-purple-50/20 to-white shadow-lg lg:flex-row">
        <div
          className={`relative h-80 w-full flex-1 transition-all duration-700 delay-300 ease-out lg:order-1 lg:h-auto ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-background/30 via-transparent to-background/50" />
          <img
            src={traineesImg2}
            alt="GymGem trainers"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div
          className={`flex flex-1 flex-col justify-center gap-10 px-6 py-12 transition-all duration-700 ease-out sm:px-10 lg:order-2 lg:px-12 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              For trainers
            </p>
            <h3 className="font-bebas text-3xl tracking-tight text-foreground sm:text-4xl text-[#FF8211]">
              Grow your coaching practice
            </h3>
            <p className="text-base text-muted-foreground sm:text-lg text-[#555555]">
              Connect with motivated trainees, offer classes, and manage your
              bookings in a calm, focused workspace built for your brand.
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
                  Reach more clients
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Be discovered by trainees searching for personal training,
                  specialty classes, and coaches who match their style.
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
                  Effortless scheduling
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Keep sessions, availability, and payments organized with
                  real-time updates and reminders.
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
                  Build your brand
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Showcase achievements, share transformations, and collect
                  reviews that highlight your strengths.
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
              className="inline-flex items-center text-[#FF8211] gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3 hover:text-primary/80"
            >
              Become a coach today
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForTrainers;

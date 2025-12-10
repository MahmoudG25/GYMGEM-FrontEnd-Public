import { Check, Clock, Dumbbell } from "lucide-react";
import Nutrition from "../../assets/Nutrition & Diet Plans.jpg";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

function NutritionSec() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-r from-amber-50/40 via-background to-orange-50/40 py-20">
      <div className={`mx-auto flex w-[80%] flex-col overflow-hidden rounded-[32px] border-2 border-amber-200 bg-gradient-to-br from-white via-amber-50/20 to-white shadow-lg lg:flex-row transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}>
        <div className={`flex flex-1 flex-col justify-center gap-10 px-6 py-12 transition-all duration-700 ease-out sm:px-10 lg:px-12 ${
          isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
        }`}>
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Nutrition &amp; diet plans
            </p>
            <h3 className="font-bebas text-3xl tracking-tight text-foreground sm:text-4xl text-[#FF8211]">
              Eat smarter so your training lasts longer
            </h3>
            <p className="text-base text-muted-foreground sm:text-lg text-[#555555]">
              Get calm, personalized nutrition coaching that aligns your meals
              with the way you train and recover.
            </p>
          </header>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <dt className="text-sm font-semibold text-foreground">
                  Personalized meal plans
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Receive plans adapted to your nutrition preferences, energy
                  output, and lifestyle.
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <dt className="text-sm font-semibold text-foreground">
                  Expert guidance
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Work with certified nutritionists who help you align macros,
                  hydration, and recovery.
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/40 text-foreground">
                <Dumbbell className="h-4 w-4" />
              </div>
              <div>
                <dt className="text-sm font-semibold text-foreground">
                  Track your progress
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Monitor meals, milestones, and performance trends from a
                  single, intuitive dashboard.
                </dd>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <a
              href="#"
              className="inline-flex items-center text-[#FF8211] gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
            >
              Explore nutrition plans
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className={`relative h-80 w-full flex-1 transition-all duration-700 delay-300 ease-out lg:h-auto ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/50" />
          <img
            src={Nutrition}
            alt="Nutrition and diet plans"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default NutritionSec;

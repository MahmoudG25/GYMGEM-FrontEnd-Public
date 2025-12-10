import gym1 from "../assets/pexels1.jpg";
import gym2 from "../assets/pexels2.jpg";
import gym3 from "../assets/pexels3.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <section className="w-full bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:items-center lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4">
              <img
                src={gym1}
                alt="GymGem community space"
                className="h-64 w-full rounded-3xl object-cover shadow-sm"
              />
              <img
                src={gym2}
                alt="Training session"
                className="h-64 w-full rounded-3xl object-cover shadow-sm"
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="relative h-full">
                <img
                  src={gym3}
                  alt="Nutrition support"
                  className="h-full w-full rounded-3xl object-cover shadow-sm"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-background/10 via-transparent to-background/60" />
              </div>
            </div>
          </div>

          <article className="space-y-6">
            <header className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Our story
              </p>
              <h1 className="font-bebas text-4xl tracking-tight text-foreground sm:text-5xl">
                A calm hub for trainers, trainees, gyms, and stores
              </h1>
            </header>
            <p className="text-base text-muted-foreground sm:text-lg">
              GymGem started with a simple intention: make it easier for the fitness community to
              collaborate. We bring every role—trainer, trainee, gym, and store—into one balanced
              platform where progress feels clear and manageable.
            </p>
            <p className="text-base text-muted-foreground sm:text-lg">
              From structured coaching to nutrition plans and verified products, we design mindful
              workflows that support long-term consistency. Every interaction feels calm, transparent,
              and focused on the next milestone.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <h2 className="font-bebas text-2xl text-foreground">Community first</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Relationships matter. We keep communication clear and make it simple to stay
                  connected and accountable.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
                <h2 className="font-bebas text-2xl text-foreground">Progress you can feel</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Calm dashboards and thoughtful nudges keep you aligned with every phase of the
                  journey—from first session to long-term habits.
                </p>
              </div>
            </div>

            <a
              href="#!"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Discover GymGem
            </a>
          </article>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default About;

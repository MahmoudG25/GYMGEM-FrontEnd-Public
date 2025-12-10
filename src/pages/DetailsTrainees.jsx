import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";

const RequestDetails = () => {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <section className="w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Request details
            </p>
            <h2 className="font-bebas text-4xl tracking-tight text-foreground sm:text-5xl">
              Looking for personal trainer for weight loss
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Posted by Ahmed Khaled · 2 days ago · Cairo, Egypt
            </p>
          </div>

          <div className="h-48 w-full overflow-hidden rounded-3xl border border-border bg-muted/60" />

          <div className="grid gap-10 lg:grid-cols-[2fr,1fr] lg:items-start">
            <article className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-sm">
              <header className="space-y-3">
                <h3 className="font-bebas text-2xl text-foreground">
                  About the request
                </h3>
                <p className="text-sm text-muted-foreground">
                  “I’m looking for a certified trainer who can help me lose 5kg
                  in 8 weeks. I prefer online sessions three times per week,
                  with guidance on workouts and nutrition. Consistency and
                  accountability are key for me.”
                </p>
              </header>

              <dl className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex flex-col rounded-2xl bg-muted/40 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Focus areas
                  </dt>
                  <dd className="mt-2 text-foreground">
                    Endurance, clean nutrition, at-home sessions
                  </dd>
                </div>
                <div className="flex flex-col rounded-2xl bg-muted/40 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Preferred schedule
                  </dt>
                  <dd className="mt-2 text-foreground">
                    3 sessions per week · 45 minutes
                  </dd>
                </div>
              </dl>
            </article>

            <aside className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-28">
              <div className="space-y-2">
                <h4 className="font-bebas text-2xl text-foreground">
                  Apply for this request
                </h4>
                <p className="text-sm text-muted-foreground">
                  Introduce yourself, outline your approach, and share your
                  proposed coaching fee.
                </p>
              </div>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write a short message..."
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background/80 px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="price"
                    className="text-sm font-medium text-foreground"
                  >
                    Expected price (EGP)
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="Enter your package price"
                    className="h-11 w-full rounded-xl border border-border bg-background/80 px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background placeholder:text-muted-foreground"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#FF8211]/90 px-4 text-sm font-semibold text-white transition hover:bg-[#e9750f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Apply now
                </button>
              </form>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RequestDetails;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Profile
          </p>
          <h1 className="font-bebas text-4xl tracking-tight text-foreground sm:text-5xl">
            Your GymGem workspace
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            Review and update your details, manage roles across trainer, trainee, gym, or store, and
            keep your information consistent.
          </p>
        </div>

        <div className="w-full rounded-3xl border border-border bg-card p-10 text-left shadow-sm">
          <p className="text-sm text-muted-foreground">
            Profile management is coming soon. In the meantime, continue exploring GymGem features
            from the navigation above.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;

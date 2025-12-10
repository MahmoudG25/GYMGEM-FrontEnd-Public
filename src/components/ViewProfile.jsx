import Footer from "./Footer";
import Navbar from "./Navbar";
import { FaUsers, FaStar, FaClock, FaEnvelope, FaCertificate } from "react-icons/fa";

const Viewprofile = () => {
    const trainer = {
        name: "Mohamed Ali",
        role: "Certified Strength Trainer",
        bio:
            "Passionate trainer with 8+ years helping clients build strength, mobility, and confidence. Specializes in beginner to intermediate programs and functional movement.",
        clients: 124,
        experience: "8 yrs",
        rating: 4.9,
        services: [
            "Personal Training",
            "Online Coaching",
            "Nutrition Plan",
            "Group Sessions",
        ],
    };

    return (
        <>
            <Navbar />

            <main className="w-full min-h-screen bg-background text-foreground">
                <div className="mx-auto w-[80%] px-6 py-12">
                    <div className="bg-card rounded-lg border border-border shadow p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:flex-1">
                                <div className="flex items-start gap-6">
                                    <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-muted border border-border flex items-center justify-center text-3xl text-muted-foreground font-semibold">
                                        MA
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-2xl md:text-3xl font-bold font-bebas text-foreground">
                                            {trainer.name}
                                        </h2>
                                        <p className="mt-1 text-sm font-medium text-primary">{trainer.role}</p>

                                        <p className="mt-4 text-sm text-muted-foreground max-w-3xl">
                                            {trainer.bio}
                                        </p>

                                        <div className="mt-6 flex flex-wrap items-center gap-2">
                                            {trainer.services.map((s) => (
                                                <span
                                                    key={s}
                                                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-sm text-muted-foreground"
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-foreground">About</h3>
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        Detailed trainer profile, certifications, training philosophy, and sample client results can be listed here to help clients make an informed decision.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-foreground">Certifications</h3>

                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {[
                                            { key: 'ACE', label: 'ACE' },
                                            { key: 'ISSA', label: 'ISSA' },
                                            { key: 'NASM', label: 'NASM' },
                                            { key: 'CPR', label: 'CPR' },
                                        ].map((cert) => (
                                            <div
                                                key={cert.key}
                                                className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-muted-foreground"
                                            >
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded bg-muted border border-border text-muted-foreground">
                                                    <FaCertificate />
                                                </span>
                                                <span className="font-medium text-foreground">{cert.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-foreground">Client Testimonials</h3>

                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { id: 1, name: 'Sara H.', text: 'Mohamed helped me gain confidence and add 10kg to my squat in 3 months.', rating: 5 },
                                            { id: 2, name: 'Omar R.', text: 'Great trainer — structured plans and constant support.', rating: 5 },
                                            { id: 3, name: 'Lina K.', text: 'Loved the nutrition guidance and progress tracking.', rating: 4.5 },
                                        ].map((t) => (
                                            <div key={t.id} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center text-sm text-muted-foreground font-medium">
                                                        {t.name.split(' ')[0][0]}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm font-semibold text-foreground">{t.name}</p>
                                                            <p className="text-sm text-muted-foreground">{t.rating} ★</p>
                                                        </div>
                                                        <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <aside className="md:w-80">
                                <div className="rounded-xl p-6 shadow-sm border border-border bg-card">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Clients</p>
                                            <p className="text-xl font-bold text-foreground flex items-center gap-2"><FaUsers className="text-primary" /> {trainer.clients}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-muted-foreground">Experience</p>
                                            <p className="text-xl font-bold text-foreground flex items-center gap-2"><FaClock className="text-primary" /> {trainer.experience}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-sm text-muted-foreground">Rating</p>
                                        <p className="text-xl font-bold text-foreground flex items-center gap-2"><FaStar className="text-yellow-400" /> {trainer.rating}</p>
                                    </div>

                                    <div className="mt-6">
                                        <button className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                                            <FaEnvelope className="me-2" /> Contact Trainer
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Viewprofile;
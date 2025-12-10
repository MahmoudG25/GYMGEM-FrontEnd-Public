import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  CalendarClock,
  ChevronRight,
  Dumbbell,
  LayoutDashboard,
  LineChart,
  Plus,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

const Card = ({ className = "", ...props }: CardProps) => (
  <div
    className={`rounded-3xl border border-border bg-card/90 shadow-sm transition hover:border-primary/40 hover:shadow-md ${className}`}
    {...props}
  />
);

const CardHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`space-y-2 p-6 ${className}`} {...props} />
);

const CardTitle = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`font-bebas text-xl tracking-tight text-foreground ${className}`} {...props} />
);

const CardDescription = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props} />
);

const CardContent = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-6 pb-6 ${className}`} {...props} />
);

const Button = ({
  className = "",
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" }) => {
  const base = "inline-flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const variants = {
    default: "bg-primary px-4 text-primary-foreground hover:bg-primary/90",
    outline: "border border-border bg-background/80 px-4 text-foreground hover:border-primary/40 hover:text-primary",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
};

const navLinks = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Sessions", icon: CalendarClock },
  { label: "Clients", icon: Users },
  { label: "Programs", icon: Dumbbell },
  { label: "Store", icon: ShoppingBag },
  { label: "Analytics", icon: LineChart },
  { label: "Settings", icon: Settings },
];

const quickActions = [
  { label: "Add Session", icon: Plus },
  { label: "View Schedule", icon: CalendarClock },
  { label: "Manage Programs", icon: Dumbbell },
  { label: "View Store Orders", icon: ShoppingBag },
];

const activityLogs = [
  {
    title: "1:1 Strength Session Completed",
    meta: "Today · 09:30 AM",
    detail: "Client: Omar Hassan",
  },
  {
    title: "Nutrition check-in updated",
    meta: "Yesterday · 08:10 PM",
    detail: "Client: Dina Mohamed",
  },
  {
    title: "New trainee joined your program",
    meta: "Yesterday · 01:45 PM",
    detail: "Client: Karim Fathi",
  },
  {
    title: "Supplement store order fulfilled",
    meta: "Mon · 05:20 PM",
    detail: "Order #GG-48291",
  },
];

const upcomingSessions = [
  {
    time: "09:00",
    title: "HIIT Group Session",
    attendees: 6,
  },
  {
    time: "11:30",
    title: "Mobility & Recovery",
    attendees: 4,
  },
  {
    time: "14:00",
    title: "Strength Foundations",
    attendees: 3,
  },
];

const overviewMetrics = [
  {
    label: "Active trainees",
    value: "42",
    delta: "+5 this week",
    icon: Users,
  },
  {
    label: "Sessions scheduled",
    value: "18",
    delta: "6 today",
    icon: CalendarClock,
  },
  {
    label: "Store revenue",
    value: "EGP 12,400",
    delta: "+18% vs last week",
    icon: ShoppingBag,
  },
  {
    label: "Program satisfaction",
    value: "4.8 / 5.0",
    delta: "From 112 reviews",
    icon: Activity,
  },
];

const TrainerDashboard = () => {
  const [selectedRange, setSelectedRange] = useState<"7d" | "30d" | "90d">("7d");

  const chartBars = useMemo(
    () =>
      ({
        "7d": [65, 78, 52, 90, 72, 88, 60],
        "30d": [40, 55, 48, 62, 70, 68, 75, 80, 85, 90, 95, 88, 70, 60, 72, 68, 54, 48, 57, 66, 74, 82, 79, 71, 65, 69, 73, 78, 84, 90],
        "90d": [45, 50, 48, 52, 55, 58, 60, 62, 64, 66, 70, 72, 75, 78, 80, 81, 82, 84, 86, 88, 90, 88, 85, 82, 80, 78, 76, 74, 72, 70, 68, 66, 65, 63, 62, 60, 58, 57, 55, 54, 52, 51, 50, 48, 46, 45, 44, 43, 42, 41, 40, 42, 45, 48, 52, 56, 60, 65, 70, 75, 80, 78, 76, 74, 72, 70, 68, 66, 65, 63, 62, 60, 59, 58, 56, 55, 54, 53, 52, 51, 50, 48, 46, 44, 42, 40, 38, 36, 34, 32],
      }[selectedRange]),
    [selectedRange]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky top-24 hidden h-[calc(100vh-6rem)] w-64 flex-col rounded-3xl border border-border bg-card/70 p-4 shadow-sm lg:flex">
          <div className="mb-6 rounded-2xl bg-muted/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Trainer workspace</p>
            <h2 className="mt-2 font-bebas text-2xl tracking-tight">Dashboard</h2>
            <p className="text-xs text-muted-foreground">Monitor programs, clients, and store performance at a glance.</p>
          </div>
          <nav className="space-y-1">
            {navLinks.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex w-full flex-1 flex-col gap-8">
          <header className="flex flex-col gap-4 rounded-3xl border border-border bg-card/80 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Welcome back, Coach</p>
              <h1 className="mt-2 font-bebas text-4xl tracking-tight text-foreground">Here’s your training overview</h1>
              <p className="text-sm text-muted-foreground">
                Keep an eye on today’s sessions, recent activity, and performance across your trainees.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Share report</Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New program
              </Button>
            </div>
          </header>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {overviewMetrics.map(({ label, value, delta, icon: Icon }) => (
              <Card key={label} className="relative overflow-hidden">
                <CardHeader className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{label}</CardTitle>
                    <CardDescription>{delta}</CardDescription>
                  </div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="font-bebas text-4xl tracking-tight text-foreground">{value}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <Card>
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Performance overview</CardTitle>
                  <CardDescription>Sessions completed vs. goals achieved</CardDescription>
                </div>
                <div className="flex gap-2 rounded-full border border-border bg-background/80 p-1">
                  {(["7d", "30d", "90d"] as const).map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setSelectedRange(range)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase transition ${
                        selectedRange === range ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex h-64 items-end gap-2 rounded-2xl border border-dashed border-border bg-muted/40 p-4">
                  {chartBars.map((height, index) => (
                    <div key={`bar-${index}`} className="flex-1 rounded-full bg-primary/70" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Upcoming sessions</CardTitle>
                <CardDescription>Keep your next commitments in view.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {upcomingSessions.map(({ time, title, attendees }) => (
                    <li
                      key={title}
                      className="flex items-center justify-between rounded-2xl border border-border bg-background/80 px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{title}</p>
                        <p className="text-xs text-muted-foreground">{attendees} attendees</p>
                      </div>
                      <span className="font-semibold text-primary">{time}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="flex items-center justify-between border-t border-border/60 px-6 py-4 text-sm">
                <span className="text-muted-foreground">View full agenda</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          </section>

          <section className="grid gap-6 lg:grid-cols-[3fr,2fr]">
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>Latest updates across trainees, programs, and store.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {activityLogs.map(({ title, detail, meta }) => (
                    <li key={title} className="rounded-2xl bg-muted/30 p-4">
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                      <p className="text-xs text-muted-foreground">{detail}</p>
                      <p className="mt-2 text-xs text-muted-foreground">• {meta}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Quick actions</CardTitle>
                <CardDescription>Manage your workspace with one tap.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-col gap-3">
                  {quickActions.map(({ label, icon: Icon }) => (
                    <Button key={label} variant="outline" className="justify-start">
                      <Icon className="mr-3 h-4 w-4" />
                      {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
              <div className="flex items-center justify-between border-t border-border/60 px-6 py-4 text-sm">
                <span className="text-muted-foreground">Need a new shortcut?</span>
                <Button variant="outline" className="h-9 px-3 text-xs">
                  Customize
                </Button>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TrainerDashboard;


import NavBarDash from "./NavBarDash.jsx";
import FooterDash from "../FooterDash.jsx";
import { Link } from "react-router-dom";

const DashboardTrainer = () => {
  const courses = JSON.parse(localStorage.getItem("courses")) || [];
  const totalCourses = courses.length;

  const coursesWithRevenue = courses.map((course) => ({
    title: course.title,
    clients: course.client || 0,
    revenue: (course.client || 0) * (parseFloat(course.price) || 0),
  }));

  const topCourses = coursesWithRevenue
    .sort((a, b) => b.clients - a.clients)
    .slice(0, 3);

  const recentCourses = [...courses]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <>
      <NavBarDash />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 text-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* HEADER */}
              <section className="mb-8">
                <h1 className="font-bebas text-4xl text-center text-[#ff8211] tracking-wide">
                  Dashboard
                </h1>
                <p className="mt-2 text-center text-sm text-slate-500">
                  Overview of your courses, students and revenue.
                </p>
              </section>

              {/* STATS CARDS */}
              <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-xs font-semibold text-[#ff8211] uppercase">Total Subs</p>
                    <p className="mt-2 font-bebas text-3xl text-slate-900">250</p>
                    <p className="text-xs text-slate-500 mt-1">Active subscribers</p>
                  </div>
                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-xs font-semibold text-green-600 uppercase">Total Courses</p>
                    <p className="mt-2 font-bebas text-3xl text-slate-900">{totalCourses}</p>
                    <p className="text-xs text-slate-500 mt-1">Published courses</p>
                  </div>
                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-xs font-semibold text-blue-600 uppercase">Revenue</p>
                    <p className="mt-2 font-bebas text-3xl text-slate-900">$1,240</p>
                    <p className="text-xs text-slate-500 mt-1">This month</p>
                  </div>
                </div>
              </section>

              {/* TOP COURSES */}
              <section className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-bebas text-xl text-slate-900">Top Courses</h2>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="space-y-3">
                  {topCourses.length > 0 ? (
                    topCourses.map((c, index) => (
                      <div key={index} className="flex items-center justify-between bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{c.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{c.clients} clients</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bebas text-xl text-green-600">${c.revenue.toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white border border-slate-100 p-6 rounded-xl shadow-sm text-center">
                      <p className="text-slate-500 text-sm">No courses available yet</p>
                    </div>
                  )}
                </div>
              </section>

              {/* RECENT COURSES */}
              <section className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-bebas text-xl text-slate-900">Recent Courses</h2>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentCourses.length > 0 ? (
                    recentCourses.map((course, index) => (
                      <div key={index} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                        <p className="font-semibold text-slate-800 truncate">{course.title}</p>
                        <div className="mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              course.status === "Published"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {course.status || "Published"}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full bg-white border border-slate-100 p-6 rounded-xl shadow-sm text-center">
                      <p className="text-slate-500 text-sm">No recent courses</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 lg:border-l lg:border-slate-200 lg:pl-6">
              <div className="space-y-6">
                {/* PROFILE CARD */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bebas text-xl text-[#ff8211] tracking-wide">Profile</h4>
                  <div className="mt-4">
                    <p className="font-semibold text-slate-900">Ali Kamal</p>
                    <p className="text-sm text-slate-500 mt-1">Trainer</p>
                    <p className="text-sm text-slate-500 mt-1">Total courses: {totalCourses}</p>
                  </div>
                </div>

                {/* QUICK PANEL */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bebas text-xl text-[#ff8211] tracking-wide">Quick Actions</h4>
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    <Link to="/trainer/courses" className="text-left text-slate-700 hover:text-[#ff8211] hover:underline">
                      📚 View my courses
                    </Link>
                    <a href="#" className="text-left text-slate-700 hover:text-[#ff8211] hover:underline">
                      🧾 Transactions
                    </a>
                    <Link to="/trainer/profile" className="text-left text-slate-700 hover:text-[#ff8211] hover:underline">
                      ⚙️ Edit profile
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <FooterDash />
    </>
  );
};

export default DashboardTrainer;

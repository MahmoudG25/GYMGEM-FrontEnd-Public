import { useContext } from "react";
import { Link } from "react-router-dom";
import NavBarDashGym from "./NavBarDashGym.jsx";
import FooterDash from "../FooterDash.jsx";
import { MemberContext } from "../../../context/MemberContext";
import { SessionContext } from "../../../context/SessionContext";
import { ClassContext } from "../../../context/ClassContext";

const DashboardTrainer = () => {
  const { members } = useContext(MemberContext);
  const { sessions } = useContext(SessionContext);
  const { classes } = useContext(ClassContext);
  
  // Calculate stats
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'Active').length;
  const upcomingSessionsCount = sessions.filter(s => s.status === 'Scheduled').length;
  const activeTrainers = 12; // Static for now as requested

  // Get recent items
  const recentMembers = members.slice(0, 5);
  const recentClasses = classes.slice(0, 5);

  // Task Calculations
  const now = new Date();
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const expiringMembers = members.filter(m => {
    let expiryDate;
    if (m.expiryDate) {
      expiryDate = new Date(m.expiryDate);
    } else if (m.joinDate) {
      const joinDate = new Date(m.joinDate);
      expiryDate = new Date(joinDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Fallback to 30 days
    } else {
      return false;
    }
    return expiryDate > now && expiryDate <= threeDaysFromNow;
  }).length;

  const upcomingSessionsTask = sessions.filter(s => {
    if (s.status !== 'Scheduled') return false;
    const sessionDate = new Date(s.dateTime);
    return sessionDate > now && sessionDate <= oneDayFromNow;
  }).length;

  const upcomingClassesTask = classes.filter(c => {
    if (c.status !== 'Scheduled') return false;
    const classDate = new Date(c.dateTime);
    return classDate > now && classDate <= oneDayFromNow;
  }).length;

  const newMembersToday = members.filter(m => {
      if (!m.joinDate) return false;
      return new Date(m.joinDate).toDateString() === now.toDateString();
  }).length;

  return (
    <>
      <NavBarDashGym />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 text-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content (left 2 columns on large screens) */}
            <div className="lg:col-span-2">
              {/* HEADER */}
              <section className="mb-8">
                <h1 className="font-bebas text-4xl text-center text-[#ff8211] tracking-wide">
                  Dashboard
                </h1>
                <p className="mt-2 text-center text-sm text-slate-500">
                  Overview of your members, trainers and gym sessions.
                </p>
              </section>

              {/* STATS CARDS */}
              <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] text-center">
                    <p className="text-xs font-semibold text-[#ff8211] uppercase tracking-wide">
                      👨‍🎓 Total Members
                    </p>
                    <p className="mt-4 font-bebas text-3xl text-slate-900">
                      {totalMembers}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      {activeMembers} Active subscribers
                    </p>
                  </div>

                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] text-center">
                    <p className="text-xs font-semibold text-[#ff8211] uppercase tracking-wide">
                      ⚡ Active Trainers
                    </p>
                    <p className="mt-4 font-bebas text-3xl text-slate-900">
                      {activeTrainers}
                    </p>
                  </div>

                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] text-center">
                    <p className="text-xs font-semibold text-[#ff8211] uppercase tracking-wide">
                      💪🏻 Upcoming Sessions
                    </p>
                    <p className="mt-4 font-bebas text-3xl text-slate-900">
                      {upcomingSessionsCount}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Scheduled</p>
                  </div>
                </div>
              </section>

              {/* TASKS */}
              <section className="mb-8">
                <div className="flex items-center gap-4">
                  <span className="flex-1 h-px bg-slate-200" />
                  <h2 className="font-bebas text-2xl text-slate-900">Tasks</h2>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>

                <div>
                  <ul className="mt-6 space-y-3 text-[0.95rem] text-slate-600">
                    <li className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold text-sm">
                        {expiringMembers}
                      </span>
                      <span>Subscription expiring soon (within 3 days)</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                        {upcomingSessionsTask}
                      </span>
                      <span>Upcoming sessions in the next 24 hours</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 font-bold text-sm">
                        {upcomingClassesTask}
                      </span>
                      <span>Classes starting soon (within 24 hours)</span>
                    </li>
                    <li className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 font-bold text-sm">
                        {newMembersToday}
                      </span>
                      <span>New members joined today</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* RECENT MEMBERS */}
              <section>
                <div className="flex items-center gap-4">
                  <span className="flex-1 h-px bg-slate-200" />
                  <h2 className="font-bebas text-2xl text-slate-900">
                    Recent Members
                  </h2>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full table-auto bg-white border border-slate-100 rounded-2xl shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                    <thead>
                      <tr className="text-left border-b border-slate-100 bg-slate-50">
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Name
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Membership
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMembers.length > 0 ? (
                        recentMembers.map((member) => (
                          <tr
                            key={member.id}
                            className="border-b last:border-b-0 border-slate-100 hover:bg-orange-50/40 transition-colors"
                          >
                            <td className="px-4 py-3 text-sm text-slate-800">
                              {member.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700">
                              {member.membershipType}
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                member.status === 'Active' ? 'bg-green-100 text-green-700' :
                                member.status === 'Inactive' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {member.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-sm text-center text-slate-500">
                            No members yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* RECENT CLASSES */}
              <section className="mt-8">
                <div className="flex items-center gap-4">
                  <span className="flex-1 h-px bg-slate-200" />
                  <h2 className="font-bebas text-2xl text-slate-900">
                    Recent Classes
                  </h2>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full table-auto bg-white border border-slate-100 rounded-2xl shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                    <thead>
                      <tr className="text-left border-b border-slate-100 bg-slate-50">
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Class Name
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Trainer
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">
                          Date & Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentClasses.length > 0 ? (
                        recentClasses.map((gymClass) => (
                          <tr key={gymClass.id} className="border-b last:border-b-0 border-slate-100 hover:bg-orange-50/40 transition-colors">
                            <td className="px-4 py-3 text-sm text-slate-800">{gymClass.className}</td>
                            <td className="px-4 py-3 text-sm text-slate-700">{gymClass.trainer}</td>
                            <td className="px-4 py-3 text-sm text-slate-700">{new Date(gymClass.dateTime).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-3 text-sm text-center text-slate-500">
                            No classes scheduled.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Sidebar (right column) */}
            <aside className="lg:col-span-1 lg:border-l lg:border-slate-200 lg:pl-6">
              <div className="space-y-6">
                {/* PROFILE CARD */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                  <h4 className="font-bebas text-xl text-[#ff8211] tracking-wide">
                    Profile
                  </h4>
                  <div className="mt-4">
                    <p className="font-semibold text-slate-900">GYMGEM</p>
                    <p className="text-sm text-slate-500 mt-1">Admin</p>
                  </div>
                </div>

                {/* QUICK PANEL */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
                  <h4 className="font-bebas text-xl text-[#ff8211] tracking-wide">
                    Quick Panel
                  </h4>
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    <Link
                      to="/gym/GymMember"
                      className="text-slate-700 hover:text-[#ff8211] hover:underline"
                    >
                      ➕ Add Member
                    </Link>
                    <Link
                      to="/gym/GymSessions"
                      className="text-slate-700 hover:text-[#ff8211] hover:underline"
                    >
                      ➕ Add Session
                    </Link>
                    <Link
                      to="/gym/GymClasses"
                      className="text-slate-700 hover:text-[#ff8211] hover:underline"
                    >
                      ➕ Add Class
                    </Link>
                  </div>
                </div>

                {/* CHAT PLACEHOLDER */}
                <div>{/* <Chat /> */}</div>
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

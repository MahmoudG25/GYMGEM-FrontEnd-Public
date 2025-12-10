import { useState, useContext } from "react";
import { SessionContext } from "../../../context/SessionContext";
import NavBarDashGym from "./NavBarDashGym.jsx";
import FooterDash from "../FooterDash.jsx";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const GymSessions = () => {
  const { sessions, addSession, completeSession, cancelSession } = useContext(SessionContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSession, setNewSession] = useState({
    trainer: "",
    member: "",
    dateTime: "",
  });

  const handleAddSession = (e) => {
    e.preventDefault();
    if (newSession.trainer && newSession.member && newSession.dateTime) {
      addSession(newSession);
      setNewSession({ trainer: "", member: "", dateTime: "" });
      setShowAddForm(false);
    }
  };

  return (
    <>
      <NavBarDashGym />
      <main className="bg-background text-foreground min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <section className="mb-6 flex justify-between items-center">
            <h1 className="font-bebas text-3xl text-[#ff8211]">Sessions Management</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#ff8211] text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              {showAddForm ? "Cancel" : "➕ Add Session"}
            </button>
          </section>

          {showAddForm && (
            <section className="mb-8 bg-surface p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bebas mb-4">Schedule New Session</h3>
              <form onSubmit={handleAddSession} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Trainer Name"
                  className="p-2 rounded border"
                  value={newSession.trainer}
                  onChange={(e) => setNewSession({ ...newSession, trainer: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Member Name"
                  className="p-2 rounded border"
                  value={newSession.member}
                  onChange={(e) => setNewSession({ ...newSession, member: e.target.value })}
                  required
                />
                <input
                  type="datetime-local"
                  className="p-2 rounded border"
                  value={newSession.dateTime}
                  onChange={(e) => setNewSession({ ...newSession, dateTime: e.target.value })}
                  required
                />
                <button type="submit" className="md:col-span-3 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Schedule Session
                </button>
              </form>
            </section>
          )}

          <section>
            <div className="overflow-x-auto">
              <table className="w-full bg-surface rounded-lg shadow-sm">
                <thead className="bg-background/40">
                  <tr className="text-left text-muted-foreground text-sm">
                    <th className="px-4 py-3">Trainer</th>
                    <th className="px-4 py-3">Member</th>
                    <th className="px-4 py-3">Date & Time</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.length > 0 ? (
                    sessions.map((session) => (
                      <tr key={session.id} className="border-b last:border-b-0">
                        <td className="px-4 py-4">{session.trainer}</td>
                        <td className="px-4 py-4">{session.member}</td>
                        <td className="px-4 py-4">{new Date(session.dateTime).toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            session.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            session.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {session.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {session.status === 'Scheduled' && (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => completeSession(session.id)}
                                className="text-green-600 hover:text-green-800"
                                title="Complete"
                              >
                                <IoIosCheckmarkCircle size={24} />
                              </button>
                              <button
                                onClick={() => cancelSession(session.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Cancel"
                              >
                                <IoIosCloseCircle size={24} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-muted-foreground">No sessions scheduled.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <FooterDash />
    </>
  );
};

export default GymSessions;

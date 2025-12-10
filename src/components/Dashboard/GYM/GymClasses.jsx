import { useState, useContext } from "react";
import { ClassContext } from "../../../context/ClassContext";
import NavBarDashGym from "./NavBarDashGym.jsx";
import FooterDash from "../FooterDash.jsx";
import { IoIosTrash } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

const GymClasses = () => {
  const { classes, addClass, deleteClass, updateClass } = useContext(ClassContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({
    className: "",
    trainer: "",
    dateTime: "",
    status: "Scheduled",
  });

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleAddClass = (e) => {
    e.preventDefault();
    if (newClass.className && newClass.trainer && newClass.dateTime) {
      addClass(newClass);
      setNewClass({ className: "", trainer: "", dateTime: "", status: "Scheduled" });
      setShowAddForm(false);
    }
  };

  return (
    <>
      <NavBarDashGym />
      <main className="bg-background text-foreground min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <section className="mb-6 flex justify-between items-center">
            <h1 className="font-bebas text-3xl text-[#ff8211]">Classes Management</h1>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#ff8211] text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition"
            >
              {showAddForm ? "Cancel" : "➕ Add Class"}
            </button>
          </section>

          {showAddForm && (
            <section className="mb-8 bg-surface p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bebas mb-4">Create New Class</h3>
              <form onSubmit={handleAddClass} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Class Name"
                  className="p-2 rounded border"
                  value={newClass.className}
                  onChange={(e) => setNewClass({ ...newClass, className: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Trainer Name"
                  className="p-2 rounded border"
                  value={newClass.trainer}
                  onChange={(e) => setNewClass({ ...newClass, trainer: e.target.value })}
                  required
                />
                <input
                  type="datetime-local"
                  className="p-2 rounded border"
                  value={newClass.dateTime}
                  onChange={(e) => setNewClass({ ...newClass, dateTime: e.target.value })}
                  required
                />
                <button type="submit" className="md:col-span-3 bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Create Class
                </button>
              </form>
            </section>
          )}

          <section>
            <div className="overflow-x-auto">
              <table className="w-full bg-surface rounded-lg shadow-sm">
                <thead className="bg-background/40">
                  <tr className="text-left text-muted-foreground text-sm">
                    <th className="px-4 py-3">Class Name</th>
                    <th className="px-4 py-3">Trainer</th>
                    <th className="px-4 py-3">Date & Time</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.length > 0 ? (
                    classes.map((gymClass) => (
                      <tr key={gymClass.id} className="border-b last:border-b-0">
                        <td className="px-4 py-4">
                          {editingId === gymClass.id ? (
                            <input
                              className="w-full p-1 border rounded"
                              value={editValues.className || ""}
                              onChange={(e) => setEditValues({ ...editValues, className: e.target.value })}
                            />
                          ) : (
                            gymClass.className
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {editingId === gymClass.id ? (
                            <input
                              className="w-full p-1 border rounded"
                              value={editValues.trainer || ""}
                              onChange={(e) => setEditValues({ ...editValues, trainer: e.target.value })}
                            />
                          ) : (
                            gymClass.trainer
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {editingId === gymClass.id ? (
                            <input
                              type="datetime-local"
                              className="w-full p-1 border rounded"
                              value={editValues.dateTime || ""}
                              onChange={(e) => setEditValues({ ...editValues, dateTime: e.target.value })}
                            />
                          ) : (
                            new Date(gymClass.dateTime).toLocaleString()
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            gymClass.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {gymClass.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            {editingId === gymClass.id ? (
                              <>
                                <button
                                  onClick={() => {
                                    updateClass(gymClass.id, editValues);
                                    setEditingId(null);
                                  }}
                                  className="text-green-600 text-sm hover:underline"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="text-gray-500 text-sm hover:underline"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingId(gymClass.id);
                                    setEditValues({ ...gymClass });
                                  }}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <MdOutlineEdit size={20} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm("Delete this class?")) deleteClass(gymClass.id);
                                  }}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <IoIosTrash size={20} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-muted-foreground">No classes scheduled.</td>
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

export default GymClasses;

import { useState, useMemo, useContext } from "react";
import { MemberContext } from "../../../context/MemberContext";
import NavBarDashGym from "./NavBarDashGym.jsx";
import FooterDash from "../FooterDash.jsx";
import { IoIosTrash } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

const GymMember = () => {
  const { members, addMember, deleteMember, updateMember } =
    useContext(MemberContext);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    membershipType: "Standard",
    status: "Active",
    startDate: "",
    expiryDate: "",
  });
  const [errors, setErrors] = useState({});

  const [filters, setFilters] = useState({
    status: "All",
    membershipType: "All",
    sort: "Newest",
  });
  const [query, setQuery] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newMember.name.trim()) newErrors.name = "Name is required";
    if (!newMember.age || isNaN(newMember.age) || newMember.age <= 0)
      newErrors.age = "Valid age is required";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!newMember.startDate) {
      newErrors.startDate = "Start date is required";
    } else {
      const startDate = new Date(newMember.startDate);
      if (startDate < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
    }

    if (!newMember.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (newMember.startDate) {
      const startDate = new Date(newMember.startDate);
      const expiryDate = new Date(newMember.expiryDate);
      if (expiryDate <= startDate) {
        newErrors.expiryDate = "Expiry date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addMember(newMember);
      setNewMember({
        name: "",
        age: "",
        membershipType: "Standard",
        status: "Active",
        startDate: "",
        expiryDate: "",
      });
      setShowAddForm(false);
      setErrors({});
    }
  };

  const filteredRows = useMemo(() => {
    let list = [...members];
    const q = (query || "").trim().toLowerCase();

    if (q) {
      list = list.filter(
        (m) =>
          (m.name || "").toLowerCase().includes(q) ||
          (m.membershipType || "").toLowerCase().includes(q)
      );
    }

    if (filters.status !== "All") {
      list = list.filter((m) => m.status === filters.status);
    }
    if (filters.membershipType !== "All") {
      list = list.filter((m) => m.membershipType === filters.membershipType);
    }

    switch (filters.sort) {
      case "Newest":
        // Assuming newer members are added to the beginning or have higher IDs/dates if available.
        // Since we prepend in context, index 0 is newest.
        // But for stable sort let's rely on joinDate if available or just list order.
        // The context adds new members to the start of the array.
        break;
      case "Oldest":
        list.reverse();
        break;
      case "Name (A–Z)":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [members, filters, query]);

  const totalCount = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const currentPage = Math.min(page, totalPages);
  const offset = (currentPage - 1) * pageSize;
  const visibleRows = filteredRows.slice(offset, offset + pageSize);

  return (
    <>
      <NavBarDashGym />
      <main className="bg-background text-foreground min-h-screen pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header & Search */}
          <section className="mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-[60%] relative">
                <input
                  type="search"
                  placeholder="Search members..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full h-12 rounded-full border border-muted bg-background/60 px-4 pl-12 text-sm outline-none focus:ring-2 focus:ring-[#ff8211] transition"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  🔍
                </span>
              </div>

              <div className="w-full sm:w-auto">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ff8211] text-white px-4 py-2 text-sm font-semibold shadow-sm hover:scale-105 transition"
                >
                  {showAddForm ? "❌ Cancel" : "➕ Add Member"}
                </button>
              </div>
            </div>
          </section>

          {/* Add Member Form */}
          {showAddForm && (
            <section className="mb-8 bg-surface p-6 rounded-xl shadow-sm border border-border">
              <h3 className="text-xl font-bebas mb-4">Add New Member</h3>
              <form
                onSubmit={handleAddMember}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded border border-border bg-background"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember({ ...newMember, name: e.target.value })
                    }
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded border border-border bg-background"
                    value={newMember.age}
                    onChange={(e) =>
                      setNewMember({ ...newMember, age: e.target.value })
                    }
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Membership Type
                  </label>
                  <select
                    className="w-full p-2 rounded border border-border bg-background"
                    value={newMember.membershipType}
                    onChange={(e) =>
                      setNewMember({
                        ...newMember,
                        membershipType: e.target.value,
                      })
                    }
                  >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    className="w-full p-2 rounded border border-border bg-background"
                    value={newMember.status}
                    onChange={(e) =>
                      setNewMember({ ...newMember, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subscription Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 rounded border border-border bg-background"
                    value={newMember.startDate || ""}
                    onChange={(e) =>
                      setNewMember({ ...newMember, startDate: e.target.value })
                    }
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subscription Expiry Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 rounded border border-border bg-background"
                    value={newMember.expiryDate || ""}
                    onChange={(e) =>
                      setNewMember({ ...newMember, expiryDate: e.target.value })
                    }
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                  >
                    Save Member
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Filters */}
          <div className="flex items-center my-6">
            <span className="flex-1 h-px bg-muted" />
            <h2 className="font-bebas text-2xl px-4">Filter</h2>
            <span className="flex-1 h-px bg-muted" />
          </div>

          <section className="mb-6">
            <div className="flex flex-wrap items-center gap-4 md:gap-8 md:justify-between">
              <label className="flex items-center gap-2 text-[15px]">
                <span>💳 Membership:</span>
                <select
                  className="border rounded px-2 py-1 outline-none focus:border-black"
                  value={filters.membershipType}
                  onChange={(e) =>
                    setFilters({ ...filters, membershipType: e.target.value })
                  }
                >
                  <option value="All">All</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-[15px]">
                <span>📈 Status:</span>
                <select
                  className="border rounded px-2 py-1 outline-none focus:border-black"
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-[15px]">
                <span>📅 Sort by:</span>
                <select
                  className="border rounded px-2 py-1 outline-none focus:border-black"
                  value={filters.sort}
                  onChange={(e) =>
                    setFilters({ ...filters, sort: e.target.value })
                  }
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Name (A–Z)">Name (A–Z)</option>
                </select>
              </label>
            </div>
          </section>

          {/* Members List */}
          <section>
            <div className="mt-6 text-primary font-bebas text-2xl uppercase">
              <h2>Members List</h2>
            </div>

            <div className="w-full mt-6 overflow-x-auto">
              <table className="w-full min-w-full bg-surface rounded-lg shadow-sm">
                <thead className="bg-background/40">
                  <tr className="text-sm text-muted-foreground">
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Age</th>
                    <th className="px-4 py-3 text-left">Membership</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Expiry Date</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.length > 0 ? (
                    visibleRows.map((row) => (
                      <tr key={row.id} className="border-b last:border-b-0">
                        <td className="px-4 py-4">
                          {editingId === row.id ? (
                            <input
                              className="w-full rounded border px-2 py-1"
                              value={editValues.name || ""}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            <span className="font-medium">{row.name}</span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {editingId === row.id ? (
                            <input
                              type="number"
                              className="w-20 rounded border px-2 py-1"
                              value={editValues.age || ""}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  age: e.target.value,
                                })
                              }
                            />
                          ) : (
                            row.age
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {editingId === row.id ? (
                            <select
                              className="rounded border px-2 py-1"
                              value={
                                editValues.membershipType || row.membershipType
                              }
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  membershipType: e.target.value,
                                })
                              }
                            >
                              <option value="Standard">Standard</option>
                              <option value="Premium">Premium</option>
                              <option value="VIP">VIP</option>
                            </select>
                          ) : (
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                row.membershipType === "VIP"
                                  ? "bg-purple-100 text-purple-700"
                                  : row.membershipType === "Premium"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {row.membershipType}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          {editingId === row.id ? (
                            <select
                              className="rounded border px-2 py-1"
                              value={editValues.status || row.status}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  status: e.target.value,
                                })
                              }
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                            </select>
                          ) : (
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                row.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : row.status === "Inactive"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {row.status}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">
                          {editingId === row.id ? (
                            <input
                              type="date"
                              className="w-full rounded border px-2 py-1"
                              value={editValues.expiryDate || ""}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  expiryDate: e.target.value,
                                })
                              }
                            />
                          ) : row.expiryDate ? (
                            new Date(row.expiryDate).toLocaleDateString("en-GB")
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="inline-flex items-center gap-4">
                            {editingId === row.id ? (
                              <>
                                <button
                                  className="text-green-600 hover:underline text-sm"
                                  onClick={() => {
                                    updateMember(row.id, editValues);
                                    setEditingId(null);
                                    setEditValues({});
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  className="text-gray-500 hover:underline text-sm"
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditValues({});
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="text-blue-600 hover:text-blue-800"
                                  onClick={() => {
                                    setEditingId(row.id);
                                    setEditValues({ ...row });
                                  }}
                                >
                                  <MdOutlineEdit size={20} />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-800"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Delete member ${row.name}?`
                                      )
                                    ) {
                                      deleteMember(row.id);
                                    }
                                  }}
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
                      <td
                        colSpan="6"
                        className="text-center py-8 text-muted-foreground"
                      >
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="py-6 text-center text-sm font-semibold tracking-wide">
                <div className="inline-flex items-center gap-3">
                  <button
                    className="px-3 py-1 rounded border bg-background/60 disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                  >
                    PREV
                  </button>
                  <span className="text-muted-foreground">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="px-3 py-1 rounded border bg-background/60 disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <FooterDash />
    </>
  );
};

export default GymMember;

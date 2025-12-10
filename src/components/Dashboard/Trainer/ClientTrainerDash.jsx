import NavBarDash from "./NavBarDash";
import FooterDash from "../FooterDash";
import { Link, NavLink } from "react-router-dom";
import testimg from "../../../assets/cardCo1.png";
import { IoIosTrash } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { GrFormView } from "react-icons/gr";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  Eye,
  X,
  Mail,
  Phone,
  BookOpenCheck,
  Star,
  MessageSquareText,
  Trophy,
} from "lucide-react";

const rows = [
  {
    id: 1,
    name: "Ali Kamal",
    email: "alikk@gmail.com",
    phone: "01001234567",
    enrolled: 5,
    status: "Active",
    avatar: testimg,
    progress: 80,
    reviewsGiven: 5,
    feedback: "Great explanations!",
  },
  {
    id: 2,
    name: "Mahmoud Gado",
    email: "Mahmoud@gmail.com",
    phone: "01015580843",
    enrolled: 5,
    status: "Active",
    avatar: testimg,
    progress: 80,
    reviewsGiven: 5,
    feedback: "Great explanations!",
  },
  {
    id: 3,
    name: "Ali Kamal",
    email: "alikk@gmail.com",
    phone: "01001234567",
    enrolled: 5,
    status: "Active",
    avatar: testimg,
    progress: 80,
    reviewsGiven: 5,
    feedback: "Great explanations!",
  },
];
// POP-UP CLIENT DETAILS DATA

// --------------------------------------------
const ClientTrainerDash = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearching && inputRef.current) inputRef.current.focus();
  }, [isSearching]);

  // POP-UP CLIENT DETAILS DATA-----------------
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const onView = (client) => {
    setSelected(client);
    setOpen(true);
  };

  // filters
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");

  // compute filtered rows based on query (case-insensitive)
  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = rows.slice();

    // search by name/email/phone
    if (q) {
      result = result.filter((r) => {
        return (
          (r.name ?? "").toLowerCase().includes(q) ||
          (r.email ?? "").toLowerCase().includes(q) ||
          (r.phone ?? "").toLowerCase().includes(q)
        );
      });
    }

    // category filter: enrolled vs not enrolled
    if (categoryFilter === "enrolled") {
      result = result.filter((r) => Number(r.enrolled) > 0);
    } else if (categoryFilter === "not-enrolled") {
      result = result.filter((r) => Number(r.enrolled) === 0);
    }

    // status filter
    if (statusFilter === "active") {
      result = result.filter(
        (r) => (r.status ?? "").toLowerCase() === "active"
      );
    } else if (statusFilter === "inactive") {
      result = result.filter(
        (r) => (r.status ?? "").toLowerCase() !== "active"
      );
    }

    // sorting
    if (sortBy === "name-asc") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    } else if (sortBy === "enrolled-desc") {
      result.sort((a, b) => Number(b.enrolled) - Number(a.enrolled));
    } else if (sortBy === "enrolled-asc") {
      result.sort((a, b) => Number(a.enrolled) - Number(b.enrolled));
    }

    return result;
  }, [query, categoryFilter, statusFilter, sortBy]);
  // --------------------------------------------

  return (
    <>
      <NavBarDash />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 text-slate-900 py-12">
        <section>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center">
              <span className="flex-1 h-px bg-slate-200" />
              <div className="px-4">
                <h2 className="font-bebas text-4xl text-center text-slate-900">Overview</h2>
              </div>
              <span className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                <p className="text-xs font-semibold text-[#ff8211] uppercase">Total Clients</p>
                <p className="mt-2 font-bebas text-3xl text-slate-900">120</p>
                <p className="text-xs text-slate-500 mt-1">All registered</p>
              </div>
              <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                <p className="text-xs font-semibold text-green-600 uppercase">Active Clients</p>
                <p className="mt-2 font-bebas text-3xl text-slate-900">85</p>
                <p className="text-xs text-slate-500 mt-1">Currently enrolled</p>
              </div>
              <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                <p className="text-xs font-semibold text-blue-600 uppercase">Inactive</p>
                <p className="mt-2 font-bebas text-3xl text-slate-900">35</p>
                <p className="text-xs text-slate-500 mt-1">Not active</p>
              </div>
            </div>
          </div>
        </section>
        {/* -------------------------------------------------------- */}
        <section className="w-full ">
          <div className="max-w-6xl mx-auto px-4 mt-8">
            <div>
              <div className="mb-6">
                <h2 className="font-bebas text-3xl text-slate-900">Client List</h2>
              </div>
              {/* --------------------------------------------------- */}

              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-4 md:gap-8 md:justify-between">
                  <div className="inline-block">
                    {isSearching ? (
                      <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onBlur={() => setIsSearching(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") setIsSearching(false);
                          if (e.key === "Enter") {
                            setIsSearching(false);
                          }
                        }}
                        placeholder="Search clients, email or phone"
                        className="text-sm px-4 py-2 rounded-full border border-orange-200 bg-white outline-none focus:ring-2 focus:ring-[#ff8211] shadow-sm"
                        aria-label="Search"
                      />
                    ) : (
                      <label
                        role="button"
                        tabIndex={0}
                        className="flex items-center gap-2 text-sm cursor-pointer select-none"
                        onClick={() => setIsSearching(true)}
                        onKeyDown={(e) =>
                          (e.key === "Enter" || e.key === " ") &&
                          setIsSearching(true)
                        }
                      >
                        <IoMdSearch size={20} />
                        <span>Search</span>
                      </label>
                    )}
                  </div>
                  {/* --------------------------------------------- */}
                  <label className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-700">📂 Category:</span>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff8211] focus:ring-1 focus:ring-[#ff8211] bg-white"
                    >
                      <option value="all">All</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="not-enrolled">Not enrolled</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-700">📈 Status:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff8211] focus:ring-1 focus:ring-[#ff8211] bg-white"
                    >
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-slate-700">📅 Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#ff8211] focus:ring-1 focus:ring-[#ff8211] bg-white"
                    >
                      <option value="name-asc">Name (A–Z)</option>
                      <option value="name-desc">Name (Z–A)</option>
                      <option value="enrolled-desc">
                        Enrolled (High → Low)
                      </option>
                      <option value="enrolled-asc">
                        Enrolled (Low → High)
                      </option>
                    </select>
                  </label>
                </div>
              </div>
              {/* ------------------------------------------------------ */}
              <div className="w-full mt-6">
                <div className="overflow-x-auto bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <table className="w-full min-w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr className="text-sm text-slate-700 font-semibold">
                        <th className="text-center px-4 py-3">
                          👤 Client Name
                        </th>
                        <th className="text-center px-4 py-3">📧 Email</th>
                        <th className="text-center px-4 py-3">📱 Phone</th>
                        <th className="text-center px-4 py-3">Enrolled</th>
                        <th className="text-center px-4 py-3">⏳ Status</th>
                        <th className="text-center px-4 py-3">⚙️ Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredRows.map((row) => (
                        <tr
                          key={row.id}
                          className="text-sm text-center border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-4 py-4">{row.name}</td>

                          <td className="px-4 py-4">{row.email}</td>

                          <td className="px-4 py-4">{row.phone}</td>

                          <td className="px-4 py-4">{row.enrolled}</td>

                          <td className="px-4 py-4">{row.status}</td>

                          <td className="px-4 py-4">
                            <div className="inline-flex items-center gap-4 justify-center">
                              <button
                                type="button"
                                className="inline-flex items-center gap-2 text-sm text-green-600 hover:underline"
                                aria-label={`View ${row.name}`}
                                onClick={() => onView(row)}
                              >
                                <GrFormView />
                                View
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center gap-2 text-sm text-red-600 hover:underline"
                                aria-label={`Delete ${row.name}`}
                              >
                                <IoIosTrash />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <DetailsModal
                  open={open}
                  onClose={() => setOpen(false)}
                  row={selected}
                />
              </div>
              <div className="py-6 text-center">
                <div className="inline-flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                    PREV
                  </button>
                  <button className="px-3 py-2 rounded-lg text-sm font-medium transition bg-[#ff8211] text-white">
                    1
                  </button>
                  <button className="px-3 py-2 rounded-lg text-sm font-medium transition text-slate-700 hover:bg-slate-100">
                    2
                  </button>
                  <button className="px-3 py-2 rounded-lg text-sm font-medium transition text-slate-700 hover:bg-slate-100">
                    3
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterDash />
    </>
  );
};

function DetailsModal({ open, onClose, row }) {
  const backdropRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !row) return null;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Client Details</h2>
          <button
            className="p-1 hover:bg-background/50 rounded"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-3 text-base">
          <KV
            icon={<span className="text-xl">👤</span>}
            k="Name"
            v={row.name}
          />
          <KV icon={<Mail className="h-5 w-5" />} k="Email" v={row.email} />
          <KV icon={<Phone className="h-5 w-5" />} k="Phone" v={row.phone} />
          <KV
            icon={<BookOpenCheck className="h-5 w-5" />}
            k="Enrolled"
            v={`${row.enrolled} course(s)`}
          />
          <KV
            icon={<Trophy className="h-5 w-5" />}
            k="Progress"
            v={(row.progress ?? 0) + "%"}
          />
          <KV
            icon={<Star className="h-5 w-5" />}
            k="Reviews Given"
            v={String(row.reviewsGiven ?? 0)}
          />
          <KV
            icon={<MessageSquareText className="h-5 w-5" />}
            k="Feedback"
            v={row.feedback ?? "—"}
          />
          <KV k="Status" v={row.status} />
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-[#A3D9A5] text-primary-foreground py-2.5 font-medium rounded-md hover:opacity-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function KV({ icon, k, v }) {
  return (
    <div className="flex items-start gap-3">
      {icon && <div className="mt-0.5 text-gray-700">{icon}</div>}
      <div className="flex-1">
        <div className="text-sm text-gray-500">{k}</div>
        <div className="text-gray-900 font-medium">{v}</div>
      </div>
    </div>
  );
}

export default ClientTrainerDash;

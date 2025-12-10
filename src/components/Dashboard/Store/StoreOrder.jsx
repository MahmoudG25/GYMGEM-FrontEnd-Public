import { useContext, useState, useMemo } from "react";
import NavBarDashStore from "./NavBarDashStore.jsx";
import FooterDash from "../FooterDash.jsx";
import { StoreContext } from "../../../context/StoreContext.jsx";
import { IoIosTrash } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

const StoreOrder = () => {
  const { orders, updateOrder, deleteOrder, updateOrderStatus } = useContext(StoreContext);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    customerName: "",
    status: ""
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("Date");

  // Handle Edit Click
  const handleEdit = (order) => {
    setEditingId(order.id);
    setFormData({
      productName: order.productName,
      quantity: order.quantity,
      customerName: order.customerName || "",
      status: order.status
    });
  };

  // Handle Update Submit
  const handleUpdate = (e) => {
    e.preventDefault();
    updateOrder(editingId, formData);
    setEditingId(null);
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(id);
    }
  };

  // Filter and Sort Logic
  const filteredOrders = useMemo(() => {
    let result = orders.filter(order => {
      const matchesSearch = 
        (order.productName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (order.customerName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (order.id?.toLowerCase() || "").includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === "All" || order.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    if (sortOption === "Date") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "ID") {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [orders, searchQuery, filterStatus, sortOption]);

  return (
    <>
      <NavBarDashStore />
      <main className="min-h-screen bg-slate-50 text-slate-900 pt-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* HEADER */}
          <section className="mb-8">
            <h1 className="font-bebas text-4xl text-[#ff8211] tracking-wide">Order Management</h1>
            <p className="text-sm text-slate-500">Track and manage customer orders.</p>
          </section>

          {/* CONTROLS */}
          <section className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-1/3">
              <input
                type="search"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-200 pl-10 pr-4 focus:ring-2 focus:ring-[#ff8211] outline-none"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 px-3 focus:ring-2 focus:ring-[#ff8211] outline-none bg-white text-sm"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="h-10 rounded-lg border border-slate-200 px-3 focus:ring-2 focus:ring-[#ff8211] outline-none bg-white text-sm"
              >
                <option value="Date">Sort by Date</option>
                <option value="ID">Sort by ID</option>
              </select>
            </div>
          </section>

          {/* ORDERS TABLE */}
          <section className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-6 py-4 text-xs font-mono text-slate-500">
                          {order.id.slice(0, 8)}...
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">
                          {editingId === order.id ? (
                            <input 
                              value={formData.productName}
                              onChange={(e) => setFormData({...formData, productName: e.target.value})}
                              className="border rounded px-2 py-1 w-full text-sm"
                            />
                          ) : (
                            order.productName
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {editingId === order.id ? (
                            <input 
                              type="number"
                              value={formData.quantity}
                              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                              className="border rounded px-2 py-1 w-16 text-sm"
                            />
                          ) : (
                            order.quantity
                          )}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {editingId === order.id ? (
                            <input 
                              value={formData.customerName}
                              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                              className="border rounded px-2 py-1 w-full text-sm"
                            />
                          ) : (
                            order.customerName || "N/A"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingId === order.id ? (
                            <select
                              value={formData.status}
                              onChange={(e) => setFormData({...formData, status: e.target.value})}
                              className="border rounded px-2 py-1 text-sm"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-3">
                            {editingId === order.id ? (
                              <>
                                <button 
                                  onClick={handleUpdate}
                                  className="text-green-600 hover:text-green-800 font-medium text-sm"
                                >
                                  Save
                                </button>
                                <button 
                                  onClick={() => setEditingId(null)}
                                  className="text-slate-500 hover:text-slate-700 font-medium text-sm"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button 
                                  onClick={() => handleEdit(order)} 
                                  className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 transition"
                                  title="Edit"
                                >
                                  <MdOutlineEdit size={20} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(order.id)} 
                                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition"
                                  title="Delete"
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
                      <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                        <p className="text-lg font-medium">No orders found.</p>
                      </td>
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

export default StoreOrder;

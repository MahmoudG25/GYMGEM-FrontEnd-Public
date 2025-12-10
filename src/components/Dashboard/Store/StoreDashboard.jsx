import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NavBarDashStore from "./NavBarDashStore.jsx";
import FooterDash from "../FooterDash.jsx";
import { StoreContext } from "../../../context/StoreContext.jsx";

const StoreDashboard = () => {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus, deleteOrder } = useContext(StoreContext);

  // State for modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: "", quantity: "", price: "", category: "" });

  // Stats Calculations
  const totalProducts = products.length;
  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  
  // Sales Today (Mock calculation based on orders with today's date)
  const today = new Date().toDateString();
  const salesToday = orders
    .filter(o => new Date(o.date).toDateString() === today && o.status === 'Completed')
    .reduce((acc, curr) => acc + (curr.quantity * 1), 0); // Assuming quantity * 1 for simplicity if price isn't in order

  const ordersToday = orders.filter(o => new Date(o.date).toDateString() === today).length;

  // Recent Items
  const recentProducts = [...products].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 3);
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  // Handlers
  const handleAddProductClick = () => {
    setEditingProduct(null);
    setProductForm({ name: "", quantity: "", price: "", category: "" });
    setShowProductModal(true);
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
    } else {
      addProduct(productForm);
    }
    setShowProductModal(false);
  };

  return (
    <>
      <NavBarDashStore />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 text-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* HEADER */}
              <section className="mb-8">
                <h1 className="font-bebas text-4xl text-center text-[#ff8211] tracking-wide">
                  Store Dashboard
                </h1>
                <p className="mt-2 text-center text-sm text-slate-500">
                  Manage your inventory, orders, and sales.
                </p>
              </section>

              {/* STATS CARDS */}
              <section className="mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-xs font-semibold text-[#ff8211] uppercase">Total Products</p>
                    <p className="mt-2 font-bebas text-3xl text-slate-900">{totalProducts}</p>
                  </div>
                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-xs font-semibold text-green-600 uppercase">Sales Today</p>
                    <p className="mt-2 font-bebas text-3xl text-slate-900">{salesToday}</p>
                  </div>
                  <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm text-center">
                    <p className="text-xs font-semibold text-blue-600 uppercase">Orders Today</p>
                    <p className="mt-2 font-bebas text-3xl text-slate-900">{ordersToday}</p>
                  </div>
                </div>
              </section>

              {/* RECENT PRODUCTS */}
              <section className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-bebas text-xl text-slate-900">Recent Products</h2>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentProducts.map(p => (
                    <div key={p.id} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                      <p className="font-semibold text-slate-800 truncate">{p.name}</p>
                      <p className="text-xs text-slate-500 mt-1">Added: {new Date(p.dateAdded).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* RECENT ORDERS */}
              <section className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="font-bebas text-xl text-slate-900">Recent Orders</h2>
                  <span className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="space-y-3">
                  {recentOrders.map(o => (
                    <div key={o.id} className="flex items-center justify-between bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Order #{o.id.slice(0, 8)}</p>
                        <p className="text-xs text-slate-500">{o.productName}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        o.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        o.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        o.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 lg:border-l lg:border-slate-200 lg:pl-6">
              <div className="space-y-6">
                {/* PROFILE CARD */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bebas text-xl text-[#ff8211] tracking-wide">Store Profile</h4>
                  <div className="mt-4">
                    <p className="font-semibold text-slate-900">GymGem Store</p>
                    <p className="text-sm text-slate-500 mt-1">Manager</p>
                  </div>
                </div>

                {/* QUICK PANEL */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bebas text-xl text-[#ff8211] tracking-wide">Quick Actions</h4>
                  <div className="mt-4 flex flex-col gap-3 text-sm">
                    <button onClick={handleAddProductClick} className="text-left text-slate-700 hover:text-[#ff8211] hover:underline">
                      ➕ Add Product
                    </button>
                    <Link to="/store/order" className="text-left text-slate-700 hover:text-[#ff8211] hover:underline">
                    <button className="text-left text-slate-700 hover:text-[#ff8211] hover:underline">
                      📦 View Recent Orders
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input
                    required
                    className="w-full border rounded p-2"
                    value={productForm.name}
                    onChange={e => setProductForm({...productForm, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <input
                      required
                      type="number"
                      className="w-full border rounded p-2"
                      value={productForm.quantity}
                      onChange={e => setProductForm({...productForm, quantity: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      className="w-full border rounded p-2"
                      value={productForm.price}
                      onChange={e => setProductForm({...productForm, price: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    className="w-full border rounded p-2"
                    value={productForm.category}
                    onChange={e => setProductForm({...productForm, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="Supplements">Supplements</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setShowProductModal(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-[#ff8211] text-white rounded hover:bg-[#e67300]">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <FooterDash />
    </>
  );
};

export default StoreDashboard;

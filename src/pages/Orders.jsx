import { useState, useMemo } from 'react';
import { Eye, CheckCircle2, Circle } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { orders } from '../data/orders';

const PAGE_SIZE = 8;
const statusOptions = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function Orders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900">Orders</h1>
        <p className="text-sm text-gray-600 mt-1">Track and manage customer orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by order ID or customer..." className="sm:max-w-xs" />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3.5 py-2.5 bg-gray-50 border border-[#EDDDC1] rounded-xl text-sm text-charcoal-700 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all"
        >
          {statusOptions.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide bg-beige-50">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((o) => (
                <tr key={o.id} className="border-t border-gray-50 hover:bg-bamboo-50/40 transition-colors">
                  <td className="px-5 py-3 font-semibold text-charcoal-800">{o.id}</td>
                  <td className="px-5 py-3 text-charcoal-600">{o.customer}</td>
                  <td className="px-5 py-3 text-charcoal-600 max-w-[180px] truncate">{o.productSummary}</td>
                  <td className="px-5 py-3 text-gray-500">{o.date}</td>
                  <td className="px-5 py-3 font-semibold text-charcoal-800">₹{o.total}</td>
                  <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-3">
                    <button onClick={() => setSelectedOrder(o)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors">
                      <Eye size={13} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={7} className="text-center py-10 text-gray-400">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
        </div>
      </div>

      {/* Order details modal */}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={`Order ${selectedOrder?.id}`} size="lg">
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-beige-50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Customer Information</h4>
                <p className="font-semibold text-charcoal-800">{selectedOrder.customer}</p>
                <p className="text-sm text-gray-500">{selectedOrder.customerEmail}</p>
                <p className="text-sm text-gray-500">{selectedOrder.customerPhone}</p>
              </div>
              <div className="bg-beige-50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">Shipping Address</h4>
                <p className="text-sm text-charcoal-700">{selectedOrder.shippingAddress}</p>
                <h4 className="text-xs font-semibold text-gray-400 uppercase mt-3 mb-1">Payment Method</h4>
                <p className="text-sm text-charcoal-700">{selectedOrder.paymentMethod}</p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Products Ordered</h4>
              <div className="space-y-2">
                {selectedOrder.products.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-beige-50 rounded-xl p-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal-800">{p.name}</p>
                      <p className="text-xs text-gray-400">Qty: {p.qty} × ₹{p.price}</p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal-800">₹{(p.qty * p.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm font-semibold text-charcoal-900">Total: <span className="text-lg ml-1">₹{selectedOrder.total}</span></p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Order Status Timeline</h4>
              <div className="space-y-3">
                {selectedOrder.timeline.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {step.done ? (
                      <CheckCircle2 size={18} className="text-bamboo-500 flex-shrink-0" />
                    ) : (
                      <Circle size={18} className="text-gray-300 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${step.done ? 'text-charcoal-800' : 'text-gray-400'}`}>{step.label}</p>
                    </div>
                    {step.date && <span className="text-xs text-gray-400">{step.date}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

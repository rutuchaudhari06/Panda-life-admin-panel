import { useState, useMemo } from 'react';
import { Eye } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { customers } from '../data/customers';
import { orders } from '../data/orders';

const PAGE_SIZE = 8;

export default function Customers() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return customers.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const customerOrders = useMemo(() => {
    if (!selected) return [];
    return orders.filter((o) => o.customer === selected.name);
  }, [selected]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900">Customers</h1>
        <p className="text-sm text-gray-600 mt-1">View and manage your customer base</p>
      </div>

      <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search customers by name or email..." className="sm:max-w-xs" />

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide bg-beige-50">
                <th className="px-5 py-3 font-medium">Customer Name</th>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Total Orders</th>
                <th className="px-5 py-3 font-medium">Total Spending</th>
                <th className="px-5 py-3 font-medium">Join Date</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr key={c.id} className="border-t border-gray-50 hover:bg-bamboo-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                      <span className="font-medium text-charcoal-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-charcoal-600">{c.email}</td>
                  <td className="px-5 py-3 text-charcoal-600">{c.totalOrders}</td>
                  <td className="px-5 py-3 font-semibold text-charcoal-800">₹{c.totalSpending}</td>
                  <td className="px-5 py-3 text-gray-500">{c.joinDate}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => setSelected(c)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors">
                      <Eye size={13} /> View Profile
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Customer Profile" size="lg">
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={selected.avatar} alt={selected.name} className="w-16 h-16 rounded-2xl object-cover" />
              <div>
                <h3 className="font-display font-semibold text-lg text-charcoal-900">{selected.name}</h3>
                <p className="text-sm text-gray-400">{selected.email}</p>
                <p className="text-sm text-gray-400">{selected.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-beige-50 rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-charcoal-900">{selected.totalOrders}</p>
                <p className="text-xs text-gray-400 mt-1">Total Orders</p>
              </div>
              <div className="bg-beige-50 rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-charcoal-900">₹{selected.totalSpending}</p>
                <p className="text-xs text-gray-400 mt-1">Total Spending</p>
              </div>
              <div className="bg-beige-50 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                <p className="text-xl font-bold text-charcoal-900">{selected.joinDate}</p>
                <p className="text-xs text-gray-400 mt-1">Joined</p>
              </div>
            </div>

            <div className="bg-beige-50 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-1">Address</h4>
              <p className="text-sm text-charcoal-700">{selected.address}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-3">Order History</h4>
              {customerOrders.length > 0 ? (
                <div className="space-y-2">
                  {customerOrders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between bg-beige-50 rounded-xl p-3 text-sm">
                      <div>
                        <p className="font-medium text-charcoal-800">{o.id}</p>
                        <p className="text-xs text-gray-400">{o.date} · {o.productSummary}</p>
                      </div>
                      <span className="font-semibold text-charcoal-800">₹{o.total}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No orders yet.</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

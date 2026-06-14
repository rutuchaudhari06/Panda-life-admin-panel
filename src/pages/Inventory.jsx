import { useState, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';
import { products } from '../data/products';

const PAGE_SIZE = 10;

function getStockStatus(stock, minStock) {
  if (stock === 0) return 'Out of Stock';
  if (stock <= minStock) return 'Low Stock';
  return 'In Stock';
}

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
  return products.filter((p) => {
    const status = getStockStatus(p.stock, p.minStock);

    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      status.toLowerCase().includes(search.toLowerCase())
    );
  });
}, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    const inStock = products.filter((p) => getStockStatus(p.stock, p.minStock) === 'In Stock').length;
    const lowStock = products.filter((p) => getStockStatus(p.stock, p.minStock) === 'Low Stock').length;
    const outOfStock = products.filter((p) => getStockStatus(p.stock, p.minStock) === 'Out of Stock').length;
    return { inStock, lowStock, outOfStock };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900">Inventory</h1>
        <p className="text-sm text-gray-600 mt-1">Monitor stock levels across your catalog</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5">
          <p className="text-sm text-gray-500">In Stock</p>
          <p className="text-2xl font-bold text-bamboo-600 mt-1 font-display">{stats.inStock}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold text-amber-500 mt-1 font-display">{stats.lowStock}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-500 mt-1 font-display">{stats.outOfStock}</p>
        </div>
      </div>

      <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search inventory..." className="sm:max-w-xs" />

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide bg-beige-50">
                <th className="px-5 py-3 font-medium">Product Name</th>
                <th className="px-5 py-3 font-medium">Current Stock</th>
                <th className="px-5 py-3 font-medium">Minimum Stock</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => {
                const status = getStockStatus(p.stock, p.minStock);
                const isLow = status !== 'In Stock';
                return (
                  <tr key={p.id} className={`border-t border-gray-50 transition-colors ${isLow ? 'bg-amber-50/40' : 'hover:bg-bamboo-50/40'}`}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-charcoal-800">{p.name}</span>
                        {status === 'Out of Stock' && <AlertTriangle size={14} className="text-red-500" />}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`font-semibold ${isLow ? 'text-amber-600' : 'text-charcoal-800'}`}>{p.stock}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-400">{p.minStock}</td>
                    <td className="px-5 py-3"><StatusBadge status={status} /></td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr><td colSpan={4} className="text-center py-10 text-gray-400">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
        </div>
      </div>
    </div>
  );
}

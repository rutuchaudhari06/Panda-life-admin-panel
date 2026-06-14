import { useState, useMemo } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import { FormInput, FormTextarea, FormSelect, PrimaryButton, SecondaryButton } from '../components/FormElements';
import { products as initialProducts, categories } from '../data/products';

const PAGE_SIZE = 8;
const emptyForm = { name: '', category: categories[0].name, description: '', price: '', stock: '', image: '' };

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openAddModal() {
    setEditingProduct(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setModalOpen(true);
  }

  function handleSave() {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...form, price: +form.price, stock: +form.stock, status: +form.stock > 0 ? 'Active' : 'Inactive' }
            : p
        )
      );
    } else {
      const newProduct = {
        id: `PROD-${1000 + products.length + Math.floor(Math.random() * 1000)}`,
        ...form,
        price: +form.price || 0,
        stock: +form.stock || 0,
        minStock: 15,
        status: +form.stock > 0 ? 'Active' : 'Inactive',
        image: form.image || 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80',
        sold: 0,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setModalOpen(false);
  }

  function confirmDelete() {
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal-900">Products</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your bamboo product catalog</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#1D3D12] bg-bamboo-500 text-[#1D3D12] text-sm font-semibold rounded-xl hover:bg-[#1D3D12] hover:text-white active:scale-[0.98] transition-all shadow-soft w-fit"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search products..." className="sm:max-w-xs" />
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
          className="px-3.5 py-2.5 bg-gray-50 border border-[#EDDDC1] rounded-xl text-sm text-charcoal-700 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all"
        >
          <option>All</option>
          {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 text-xs uppercase tracking-wide bg-beige-50">
                <th className="px-5 py-3 font-medium">Image</th>
                <th className="px-5 py-3 font-medium">Product Name</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p.id} className="border-t border-gray-50 hover:bg-bamboo-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                  </td>
                  <td className="px-5 py-3 font-medium text-charcoal-800 max-w-xs">{p.name}</td>
                  <td className="px-5 py-3 text-charcoal-600">{p.category}</td>
                  <td className="px-5 py-3 font-semibold text-charcoal-800">₹{p.price}</td>
                  <td className="px-5 py-3 text-charcoal-600">{p.stock}</td>
                  <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(p)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-bamboo-50 text-bamboo-600 hover:bg-bamboo-100 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(p)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={7} className="text-center py-10 text-gray-400">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} totalItems={filtered.length} pageSize={PAGE_SIZE} />
        </div>
      </div>

      {/* Add/Edit modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProduct ? 'Edit Product' : 'Add Product'} size="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormInput label="Product Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Premium Bamboo Bottle" />
          <FormSelect label="Category" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={categories.map((c) => c.name)} />
          <FormInput label="Price (₹)" type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0.00" />
          <FormInput label="Stock" type="number" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="0" />
          <div className="sm:col-span-2">
            <FormInput label="Product Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <FormTextarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief product description..." />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <SecondaryButton onClick={() => setModalOpen(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSave}>{editingProduct ? 'Save Changes' : 'Add Product'}</PrimaryButton>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Product" size="sm">
        <p className="text-sm text-charcoal-600 mb-5">
          Are you sure you want to delete <span className="font-semibold">{deleteTarget?.name}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <SecondaryButton onClick={() => setDeleteTarget(null)}>Cancel</SecondaryButton>
          <button onClick={confirmDelete} className="px-4 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 active:scale-[0.98] transition-all">
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

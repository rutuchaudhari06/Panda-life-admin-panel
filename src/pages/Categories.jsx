import { useState } from 'react';
import { Plus, Edit2, Trash2, FolderTree } from 'lucide-react';
import Modal from '../components/Modal';
import { FormInput, FormTextarea, PrimaryButton, SecondaryButton } from '../components/FormElements';
import { categories as initialCategories, products } from '../data/products';

const emptyForm = { name: '', description: '', image: '' };

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(cat) {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description, image: cat.image });
    setModalOpen(true);
  }

  function handleSave() {
    if (editing) {
      setCategories((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...form } : c)));
    } else {
      setCategories((prev) => [...prev, { id: `cat${prev.length + 1}`, ...form, image: form.image || 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' }]);
    }
    setModalOpen(false);
  }

  function confirmDelete() {
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  function productCount(catName) {
    return products.filter((p) => p.category === catName).length;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal-900">Categories</h1>
          <p className="text-sm text-gray-600 mt-1">Organize your bamboo products into categories</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 bg-bamboo-500 border border-[#1D3D12] text-[#1D3D12] text-sm font-semibold rounded-xl hover:bg-[#1D3D12] hover:text-white active:scale-[0.98] transition-all shadow-soft w-fit">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden hover:shadow-card transition-shadow group">
            <div className="h-36 overflow-hidden bg-beige-100">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-bamboo-100 flex items-center justify-center text-bamboo-600">
                  <FolderTree size={15} />
                </div>
                <h3 className="font-display font-semibold text-charcoal-900">{cat.name}</h3>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{cat.description}</p>
              <p className="text-xs text-bamboo-600 font-semibold mb-4">{productCount(cat.name)} products</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(cat)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors">
                  <Edit2 size={13} /> Edit
                </button>
                <button onClick={() => setDeleteTarget(cat)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Category' : 'Add Category'}>
        <FormInput label="Category Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Bamboo Bottles" />
        <FormInput label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
        <FormTextarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief category description..." />
        <div className="flex justify-end gap-3 mt-2">
          <SecondaryButton onClick={() => setModalOpen(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSave}>{editing ? 'Save Changes' : 'Add Category'}</PrimaryButton>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Category" size="sm">
        <p className="text-sm text-charcoal-600 mb-5">
          Are you sure you want to delete <span className="font-semibold">{deleteTarget?.name}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <SecondaryButton onClick={() => setDeleteTarget(null)}>Cancel</SecondaryButton>
          <button onClick={confirmDelete} className="px-4 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 active:scale-[0.98] transition-all">Delete</button>
        </div>
      </Modal>
    </div>
  );
}

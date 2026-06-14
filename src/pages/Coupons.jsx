import { useState } from 'react';
import { Plus, Edit2, Trash2, Ticket } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { FormInput, FormSelect, PrimaryButton, SecondaryButton } from '../components/FormElements';
import { coupons as initialCoupons } from '../data/reviews';

const emptyForm = { code: '', discount: '', expiry: '', usageLimit: '', status: 'Active' };

export default function Coupons() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(c) {
    setEditing(c);
    setForm({ code: c.code, discount: c.discount, expiry: c.expiry, usageLimit: c.usageLimit, status: c.status });
    setModalOpen(true);
  }

  function handleSave() {
    if (editing) {
      setCoupons((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...form, usageLimit: +form.usageLimit } : c)));
    } else {
      setCoupons((prev) => [...prev, { id: `CPN-${String(prev.length + 1).padStart(3, '0')}`, ...form, usageLimit: +form.usageLimit || 0, used: 0 }]);
    }
    setModalOpen(false);
  }

  function confirmDelete() {
    setCoupons((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal-900">Coupons</h1>
          <p className="text-sm text-gray-600 mt-1">Manage discount codes and promotions</p>
        </div>
        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#1D3D12] bg-bamboo-500 text-[#1D3D12] text-sm font-semibold rounded-xl hover:bg-[#1D3D12] hover:text-white active:scale-[0.98] transition-all shadow-soft w-fit">
          <Plus size={16} /> Add Coupon
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wide bg-beige-50">
                <th className="px-5 py-3 font-medium">Coupon Code</th>
                <th className="px-5 py-3 font-medium">Discount</th>
                <th className="px-5 py-3 font-medium">Expiry Date</th>
                <th className="px-5 py-3 font-medium">Usage</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-t border-gray-50 hover:bg-bamboo-50/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-bamboo-100 flex items-center justify-center text-bamboo-600">
                        <Ticket size={14} />
                      </div>
                      <span className="font-mono font-semibold text-charcoal-800">{c.code}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-semibold text-charcoal-800">{c.discount}</td>
                  <td className="px-5 py-3 text-gray-500">{c.expiry}</td>
                  <td className="px-5 py-3 text-charcoal-600">{c.used} / {c.usageLimit}</td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(c)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-bamboo-50 text-bamboo-600 hover:bg-bamboo-100 transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(c)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Coupon' : 'Add Coupon'}>
        <FormInput label="Coupon Code" required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. PANDA10" />
        <FormInput label="Discount" required value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} placeholder="e.g. 10%" />
        <FormInput label="Expiry Date" type="date" required value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
        <FormInput label="Usage Limit" type="number" required value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} placeholder="500" />
        <FormSelect label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={['Active', 'Expired']} />
        <div className="flex justify-end gap-3 mt-2">
          <SecondaryButton onClick={() => setModalOpen(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSave}>{editing ? 'Save Changes' : 'Add Coupon'}</PrimaryButton>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Coupon" size="sm">
        <p className="text-sm text-charcoal-600 mb-5">
          Are you sure you want to delete <span className="font-semibold font-mono">{deleteTarget?.code}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <SecondaryButton onClick={() => setDeleteTarget(null)}>Cancel</SecondaryButton>
          <button onClick={confirmDelete} className="px-4 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 active:scale-[0.98] transition-all">Delete</button>
        </div>
      </Modal>
    </div>
  );
}

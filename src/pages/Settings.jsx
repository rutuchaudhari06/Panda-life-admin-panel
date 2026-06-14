import { useState } from 'react';
import { Leaf, Upload } from 'lucide-react';
import { FormInput, FormSelect, FormTextarea, PrimaryButton, SecondaryButton } from '../components/FormElements';

export default function Settings() {
  const [form, setForm] = useState({
    storeName: 'Panda Life',
    contactEmail: 'support@pandalife.com',
    contactPhone: '+91 98765 43210',
    storeAddress: '12, Eco Park Avenue, Bharuch, Gujarat 392001, India',
    shippingFee: '40',
    currency: 'INR',
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900">Settings</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your store configuration</p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-6 max-w-2xl">
        <h3 className="font-display font-semibold text-charcoal-900 mb-5">Store Settings</h3>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-bamboo-500 flex items-center justify-center shadow-soft">
            <Leaf size={28} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-charcoal-800 mb-1">Store Logo</p>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors">
              <Upload size={13} /> Upload New Logo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <FormInput label="Store Name" value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} />
          <FormInput label="Contact Email" type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
          <FormInput label="Contact Phone" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} />
          <FormInput label="Shipping Fee" type="number" value={form.shippingFee} onChange={(e) => setForm({ ...form, shippingFee: e.target.value })} />
          <FormSelect label="Currency" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} options={['USD', 'EUR', 'INR', 'GBP']} />
          <div className="sm:col-span-2">
            <FormTextarea label="Store Address" value={form.storeAddress} onChange={(e) => setForm({ ...form, storeAddress: e.target.value })} rows={2} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <SecondaryButton>Cancel</SecondaryButton>
          <PrimaryButton>Save Changes</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

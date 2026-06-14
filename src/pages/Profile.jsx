import { useState } from 'react';
import { Edit2, KeyRound, LogOut, Mail, Shield, Clock } from 'lucide-react';
import Modal from '../components/Modal';
import { FormInput, PrimaryButton, SecondaryButton } from '../components/FormElements';

export default function Profile() {
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [name, setName] = useState('Ananya Sharma');
  const [email, setEmail] = useState('ananya.sharma@pandalife.com');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900">Profile</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your admin account</p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 max-w-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img src="https://i.pravatar.cc/150?img=12" alt="Admin" className="w-24 h-24 rounded-2xl object-cover shadow-soft" />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display font-semibold text-xl text-charcoal-900">{name}</h3>
            <p className="text-sm text-gray-400 mb-4">{email}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-charcoal-600">
                <Mail size={15} className="text-bamboo-500" /> {email}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-charcoal-600">
                <Shield size={15} className="text-bamboo-500" /> Role: Administrator
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-charcoal-600">
                <Clock size={15} className="text-bamboo-500" /> Last Login: June 13, 2026, 9:42 AM
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
          <button onClick={() => setEditOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-bamboo-500 text-white text-sm font-semibold rounded-xl hover:bg-bamboo-600 active:scale-[0.98] transition-all shadow-soft">
            <Edit2 size={15} /> Edit Profile
          </button>
          <button onClick={() => setPasswordOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-bamboo-50 text-bamboo-700 text-sm font-semibold rounded-xl hover:bg-bamboo-100 active:scale-[0.98] transition-all">
            <KeyRound size={15} /> Change Password
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 active:scale-[0.98] transition-all">
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Profile">
        <FormInput label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <div className="flex justify-end gap-3 mt-2">
          <SecondaryButton onClick={() => setEditOpen(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={() => setEditOpen(false)}>Save Changes</PrimaryButton>
        </div>
      </Modal>

      <Modal isOpen={passwordOpen} onClose={() => setPasswordOpen(false)} title="Change Password">
        <FormInput label="Current Password" type="password" placeholder="••••••••" />
        <FormInput label="New Password" type="password" placeholder="••••••••" />
        <FormInput label="Confirm New Password" type="password" placeholder="••••••••" />
        <div className="flex justify-end gap-3 mt-2">
          <SecondaryButton onClick={() => setPasswordOpen(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={() => setPasswordOpen(false)}>Update Password</PrimaryButton>
        </div>
      </Modal>
    </div>
  );
}

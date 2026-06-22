import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FormInput, FormSelect, PrimaryButton } from '../components/FormElements';
import logo from '../assets/panda_logo.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const [error, setError] = useState('');

  const roles = ['Admin', 'Sales', 'Support', 'Inventory Manager'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    setError('');
    const success = login(username, password, role);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid role selection');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6EFE2] flex flex-col items-center justify-center p-4">
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#9A9B47]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#1D3D12]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-8 max-w-md w-full relative z-10">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Panda Life" className="h-16 w-auto mb-3" />
          <h2 className="text-2xl font-display font-bold text-charcoal-900 text-center">Admin Portal</h2>
          <p className="text-sm text-gray-500 mt-1 text-center">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormSelect
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={roles}
            required
          />

          <PrimaryButton
            type="submit"
            className="w-full justify-center py-3 bg-[#1D3D12] hover:bg-bamboo-600 font-semibold text-white rounded-xl shadow-soft mt-6"
          >
            Sign In
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-[#EDDDC1] rounded-xl text-sm text-charcoal-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all"
      />
    </div>
  );
}

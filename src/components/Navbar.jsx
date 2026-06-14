import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { text: 'New order #ORD-5028 received', time: '5 min ago' },
    { text: 'Bamboo Mug Deluxe is low on stock', time: '1 hour ago' },
    { text: 'New review awaiting approval', time: '3 hours ago' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#F6EFE2] backdrop-blur-md border-b border-[#EDDDC1] h-20 flex items-center px-4 lg:px-8 gap-4">
      <button onClick={onMenuClick} className="lg:hidden text-charcoal-700">
        <Menu size={22} />
      </button>

      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-[#EDDDC1] rounded-xl text-sm text-charcoal-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all"
          />
        </div>
      </div>

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-3 ml-auto">
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-bamboo-50 text-charcoal-700 transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-bamboo-500 rounded-full ring-2 ring-green-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#EDDDC1] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#EDDDC1] font-display font-semibold text-sm text-charcoal-900">
                Notifications
              </div>
              {notifications.map((n, i) => (
                <div key={i} className="px-4 py-3 hover:bg-bamboo-50 transition-colors border-b border-[#EDDDC1] last:border-0">
                  <p className="text-sm text-charcoal-800">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-[#EDDDC1]">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Admin"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-charcoal-900 leading-tight">Ananya Sharma</p>
            <p className="text-xs text-gray-600 leading-tight">Admin</p>
          </div>
          <ChevronDown size={14} className="text-gray-600 hidden md:block" />
        </div>
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, Boxes,
  Star, Ticket, BarChart3, Settings, UserCircle, Leaf, X
} from 'lucide-react';
import logo from '../assets/panda_logo.png';
const menuItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/categories', label: 'Categories', icon: FolderTree },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/inventory', label: 'Inventory', icon: Boxes },
  { to: '/reviews', label: 'Reviews', icon: Star },
  { to: '/coupons', label: 'Coupons', icon: Ticket },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-charcoal-900/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#F6EFE2] border-r border-[#EDDDC1] z-50 transform transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-center px-6 h-20 border-b border-[#EDDDC1]">
          <img src={logo} alt="Panda Life" className="h-12 w-auto" />

          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-charcoal-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-none">
          {menuItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive
                  ? 'bg-bamboo-500 text-[#9A9B47] shadow-soft'
                  : 'text-charcoal-700 hover:bg-bamboo-50 hover:text-bamboo-700'
                }`
              }
              end={to === '/'}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

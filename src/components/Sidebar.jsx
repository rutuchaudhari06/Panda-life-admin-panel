import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, Boxes,
  Star, Ticket, BarChart3, Settings, UserCircle, X, ChevronDown, ChevronUp, UserPlus, Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/panda_logo.png';

const MENU_STRUCTURE = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/products', label: 'Products', icon: Package },
  { to: '/categories', label: 'Categories', icon: FolderTree },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { 
    label: 'CRM', 
    icon: Users,
    subItems: [
      { to: '/crm/customers', label: 'Customers', icon: Users },
      { to: '/crm/leads', label: 'Leads', icon: UserPlus },
      { to: '/crm/tickets', label: 'Support Tickets', icon: Ticket },
      { to: '/crm/follow-ups', label: 'Follow-ups', icon: Clock }
    ]
  },
  { to: '/inventory', label: 'Inventory', icon: Boxes },
  { to: '/reviews', label: 'Reviews', icon: Star },
  { to: '/coupons', label: 'Coupons', icon: Ticket },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/profile', label: 'Profile', icon: UserCircle },
];

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  const location = useLocation();
  const [crmExpanded, setCrmExpanded] = useState(location.pathname.startsWith('/crm'));

  useEffect(() => {
    if (location.pathname.startsWith('/crm')) {
      setCrmExpanded(true);
    }
  }, [location.pathname]);

  if (!user) return null;

  // Filter the menu items based on user permissions
  const filteredMenuItems = MENU_STRUCTURE.filter((item) => {
    if (item.subItems) {
      // If the menu has sub-items, check if any of the sub-item paths are allowed
      return item.subItems.some((sub) => user.permissions.includes(sub.to));
    }
    return user.permissions.includes(item.to);
  });

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
          {filteredMenuItems.map((item) => {
            if (item.subItems) {
              const isSubrouteActive = location.pathname.startsWith('/crm');
              return (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() => setCrmExpanded(!crmExpanded)}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${isSubrouteActive
                      ? 'bg-bamboo-50 text-bamboo-700 font-semibold'
                      : 'text-charcoal-700 hover:bg-bamboo-50 hover:text-bamboo-700'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </div>
                    {crmExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {crmExpanded && (
                    <div className="pl-4 space-y-1 border-l border-[#EDDDC1] ml-5 mt-1">
                      {item.subItems.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${isActive
                              ? 'bg-bamboo-500 text-[#9A9B47] shadow-soft'
                              : 'text-charcoal-600 hover:bg-bamboo-50 hover:text-bamboo-700'
                            }`
                          }
                        >
                          <sub.icon size={14} />
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive
                    ? 'bg-bamboo-500 text-[#9A9B47] shadow-soft'
                    : 'text-charcoal-700 hover:bg-bamboo-50 hover:text-bamboo-700'
                  }`
                }
                end={item.to === '/'}
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLE_DETAILS = {
  Admin: {
    name: 'Ananya Sharma',
    email: 'ananya.sharma@pandalife.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    permissions: [
      '/', '/products', '/categories', '/orders', 
      '/crm/customers', '/crm/leads', '/crm/tickets', '/crm/follow-ups',
      '/inventory', '/reviews', '/coupons', '/analytics', '/settings', '/profile'
    ]
  },
  Sales: {
    name: 'Rahul Verma',
    email: 'rahul.verma@pandalife.com',
    avatar: 'https://i.pravatar.cc/150?img=33',
    permissions: [
      '/', '/orders', 
      '/crm/customers', '/crm/leads', '/crm/tickets', '/crm/follow-ups',
      '/coupons', '/profile'
    ]
  },
  Support: {
    name: 'Priya Patel',
    email: 'priya.patel@pandalife.com',
    avatar: 'https://i.pravatar.cc/150?img=47',
    permissions: [
      '/', 
      '/crm/customers', '/crm/leads', '/crm/tickets', '/crm/follow-ups',
      '/reviews', '/profile'
    ]
  },
  'Inventory Manager': {
    name: 'Amit Singh',
    email: 'amit.singh@pandalife.com',
    avatar: 'https://i.pravatar.cc/150?img=68',
    permissions: [
      '/', '/products', '/categories', '/inventory', '/profile'
    ]
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRole = localStorage.getItem('user_role');
    const savedUsername = localStorage.getItem('username') || 'User';
    if (savedRole && ROLE_DETAILS[savedRole]) {
      setUser({
        username: savedUsername,
        role: savedRole,
        ...ROLE_DETAILS[savedRole]
      });
    }
    setLoading(false);
  }, []);

  const login = (username, password, role) => {
    if (!role || !ROLE_DETAILS[role]) return false;
    
    localStorage.setItem('user_role', role);
    localStorage.setItem('username', username || 'User');
    
    setUser({
      username: username || 'User',
      role,
      ...ROLE_DETAILS[role]
    });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('user_role');
    localStorage.removeItem('username');
    setUser(null);
  };

  const hasPermission = (path) => {
    if (!user) return false;
    // Normalize path by removing trailing slash if not root
    const normalized = path === '/' ? '/' : path.replace(/\/$/, '');
    
    // Check exact matches or prefix check for CRM subroutes
    return user.permissions.some(p => {
      if (p === normalized) return true;
      // Allow general match for subroutes if parent matches
      if (p === '/crm' && normalized.startsWith('/crm/')) return true;
      return false;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

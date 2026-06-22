import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Leads from './pages/Leads';
import Tickets from './pages/Tickets';
import Followups from './pages/Followups';
import Inventory from './pages/Inventory';
import Reviews from './pages/Reviews';
import Coupons from './pages/Coupons';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';

function ProtectedRoute({ children }) {
  const { user, loading, hasPermission } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EFE2] flex items-center justify-center font-display font-semibold text-[#1D3D12]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(location.pathname)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/crm/customers" element={<Customers />} />
            <Route path="/crm/leads" element={<Leads />} />
            <Route path="/crm/tickets" element={<Tickets />} />
            <Route path="/crm/follow-ups" element={<Followups />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

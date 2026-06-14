import { IndianRupee , ShoppingBag, Package, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import DashboardCard from '../components/DashboardCard';
import ChartCard from '../components/ChartCard';
import StatusBadge from '../components/StatusBadge';
import { recentOrders } from '../data/orders';
import { topSellingProducts, lowStockProducts, products } from '../data/products';
import { customers } from '../data/customers';
import { monthlySales, ordersTrend } from '../data/analytics';

export default function Dashboard() {
  const totalRevenue = monthlySales.reduce((s, m) => s + m.sales, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome back, here's what's happening with Panda Life today.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={IndianRupee} change="12.4%" accent="bamboo" />
        <DashboardCard title="Total Orders" value="5,420" icon={ShoppingBag} change="8.2%" accent="blue" />
        <DashboardCard title="Total Products" value={products.length} icon={Package} change="3.1%" accent="amber" />
        <DashboardCard title="Total Customers" value={customers.length * 18} icon={Users} change="15.7%" accent="beige" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Sales" subtitle="Revenue performance across 2026">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlySales} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#549144" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#549144" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0eade" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0eade', fontSize: 13 }} formatter={(v) => [`₹${v.toLocaleString()}`, 'Sales']} />
              <Area type="monotone" dataKey="sales" stroke="#549144" strokeWidth={2.5} fill="url(#salesGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Trend" subtitle="Number of orders per month">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0eade" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0eade', fontSize: 13 }} />
              <Bar dataKey="orders" fill="#549144" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5">
          <h3 className="font-display font-semibold text-charcoal-900 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs uppercase tracking-wide">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-[#EDDDC1] hover:bg-bamboo-50/40 transition-colors">
                    <td className="py-3 font-semibold text-charcoal-800">{order.id}</td>
                    <td className="py-3 text-charcoal-600">{order.customer}</td>
                    <td className="py-3 text-gray-400">{order.date}</td>
                    <td className="py-3 font-semibold text-charcoal-800">₹{order.total}</td>
                    <td className="py-3"><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top selling + low stock */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5">
            <h3 className="font-display font-semibold text-charcoal-900 mb-4">Top Selling Products</h3>
            <div className="space-y-3">
              {topSellingProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.sold} sold</p>
                  </div>
                  <span className="text-sm font-semibold text-charcoal-900">₹{p.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1]
           p-5">
            <h3 className="font-display font-semibold text-charcoal-900 mb-4">Low Stock Products</h3>
            <div className="space-y-3">
              {lowStockProducts.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal-800 truncate">{p.name}</p>
                    <p className="text-xs text-amber-500 font-medium">Only {p.stock} left</p>
                  </div>
                  <StatusBadge status="Low Stock" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

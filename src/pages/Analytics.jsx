import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import ChartCard from '../components/ChartCard';
import { monthlySales, ordersTrend, customerGrowth, categoryPerformance, PIE_COLORS } from '../data/analytics';
import { topSellingProducts } from '../data/products';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-charcoal-900">Analytics</h1>
        <p className="text-sm text-gray-600 mt-1">In-depth performance insights for Panda Life</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Analytics" subtitle="Monthly revenue trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlySales} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0eade" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0eade', fontSize: 13 }} formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Line type="monotone" dataKey="sales" stroke="#549144" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Analytics" subtitle="Monthly order volume">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0eade" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0eade', fontSize: 13 }} />
              <Bar dataKey="orders" fill="#72ab63" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Customer Growth" subtitle="Total registered customers over time">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={customerGrowth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0eade" vertical={false} />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0eade', fontSize: 13 }} />
              <Line type="monotone" dataKey="customers" stroke="#3f7333" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Category Performance" subtitle="Revenue share by category">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryPerformance}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {categoryPerformance.map((entry, i) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0eade', fontSize: 13 }} formatter={(v, n) => [`${v}%`, n]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top selling products */}
      <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5">
        <h3 className="font-display font-semibold text-charcoal-900 mb-4">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={topSellingProducts} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0eade" horizontal={false} />
            <XAxis type="number" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} width={180} tick={{ width: 170 }} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0eade', fontSize: 13 }} formatter={(v) => [v, 'Units sold']} />
            <Bar dataKey="sold" fill="#549144" radius={[0, 6, 6, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

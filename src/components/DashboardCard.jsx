export default function DashboardCard({ title, value, icon: Icon, change, changeType = 'up', accent = 'bamboo' }) {
  const accentBg = {
    bamboo: 'bg-bamboo-100 text-bamboo-600',
    beige: 'bg-beige-200 text-charcoal-700',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
  }[accent];

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5 flex items-center justify-between hover:shadow-card transition-shadow">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-charcoal-900 mt-1 font-display">{value}</p>
        {change && (
          <p className={`text-xs mt-2 font-semibold ${changeType === 'up' ? 'text-bamboo-600' : 'text-red-500'}`}>
            {changeType === 'up' ? '▲' : '▼'} {change} <span className="text-gray-400 font-normal">vs last month</span>
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accentBg}`}>
        {Icon && <Icon size={22} />}
      </div>
    </div>
  );
}

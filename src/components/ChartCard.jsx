export default function ChartCard({ title, subtitle, children, action }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-charcoal-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="w-full h-72">
        {children}
      </div>
    </div>
  );
}

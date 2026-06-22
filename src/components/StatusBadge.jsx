const STYLES = {
  Active: 'bg-bamboo-100 text-bamboo-700',
  Inactive: 'bg-gray-100 text-gray-500',
  Pending: 'bg-amber-100 text-amber-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-indigo-100 text-indigo-700',
  Delivered: 'bg-bamboo-100 text-bamboo-700',
  Cancelled: 'bg-red-100 text-red-600',
  'In Stock': 'bg-bamboo-100 text-bamboo-700',
  'Low Stock': 'bg-amber-100 text-amber-700',
  'Out of Stock': 'bg-red-100 text-red-600',
  Approved: 'bg-bamboo-100 text-bamboo-700',
  Rejected: 'bg-red-100 text-red-600',
  Expired: 'bg-gray-100 text-gray-500',
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-indigo-100 text-indigo-700',
  Converted: 'bg-bamboo-100 text-bamboo-700',
  High: 'bg-red-100 text-red-600',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-gray-100 text-gray-500',
  Open: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-indigo-100 text-indigo-700',
  Resolved: 'bg-bamboo-100 text-bamboo-700',
  Completed: 'bg-bamboo-100 text-bamboo-700',
  Rescheduled: 'bg-indigo-100 text-indigo-700',
};

export default function StatusBadge({ status }) {
  const cls = STYLES[status] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

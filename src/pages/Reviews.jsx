import { useState } from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { reviews as initialReviews } from '../data/reviews';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState('All');

  function updateStatus(id, status) {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function remove(id) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  const filtered = filter === 'All' ? reviews : reviews.filter((r) => r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-charcoal-900">Reviews</h1>
          <p className="text-sm text-gray-600 mt-1">Moderate customer reviews and ratings</p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-gray-50 border border-[#EDDDC1] rounded-xl text-sm text-charcoal-700 focus:outline-none focus:ring-0 focus:border-[#1D3D12] transition-all w-fit"
        >
          {['All', 'Pending', 'Approved', 'Rejected'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl shadow-soft border border-[#EDDDC1] p-5 flex flex-col sm:flex-row gap-4">
            <img src={r.productImage} alt={r.product} className="w-full sm:w-24 h-24 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <div>
                  <p className="font-display font-semibold text-charcoal-900">{r.product}</p>
                  <p className="text-xs text-gray-500">by {r.customer} · {r.date}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div className="my-2"><StarRating rating={r.rating} /></div>
              <p className="text-sm text-charcoal-600">{r.text}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => updateStatus(r.id, 'Approved')} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors">
                  <Check size={13} /> Approve
                </button>
                <button onClick={() => updateStatus(r.id, 'Rejected')} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors">
                  <X size={13} /> Reject
                </button>
                <button onClick={() => remove(r.id)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl shadow-soft border border-gray-100">No reviews found.</div>
        )}
      </div>
    </div>
  );
}

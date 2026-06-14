import StatusBadge from './StatusBadge';
import { Edit2, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-card transition-shadow group">
      <div className="relative h-40 bg-beige-100 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 right-3">
          <StatusBadge status={product.status} />
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-bamboo-600 font-semibold mb-1">{product.category}</p>
        <h3 className="font-display font-semibold text-charcoal-900 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-charcoal-900">${product.price}</span>
          <span className="text-xs text-gray-400">Stock: {product.stock}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(product)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-bamboo-50 text-bamboo-700 text-xs font-semibold rounded-lg hover:bg-bamboo-100 transition-colors"
          >
            <Edit2 size={13} /> Edit
          </button>
          <button
            onClick={() => onDelete?.(product)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

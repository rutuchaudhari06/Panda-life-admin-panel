import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, pageSize }) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-3">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-charcoal-700">{start}-{end}</span> of{' '}
        <span className="font-semibold text-charcoal-700">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-bamboo-50 hover:border-bamboo-200 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400 text-sm">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                p === currentPage
                  ? 'bg-bamboo-500 text-gray-400'
                  : 'border border-gray-200 text-gray-600 hover:bg-bamboo-50 hover:border-bamboo-200'
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 disabled:opacity-40 hover:bg-bamboo-50 hover:border-bamboo-200 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

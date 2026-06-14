export function FormInput({ label, type = 'text', value, onChange, placeholder, required, ...rest }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-charcoal-700 mb-1.5">{label}{required && <span className="text-red-400"> *</span>}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-charcoal-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bamboo-300 focus:border-bamboo-400 transition-all"
        {...rest}
      />
    </div>
  );
}

export function FormTextarea({ label, value, onChange, placeholder, rows = 3, required }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-charcoal-700 mb-1.5">{label}{required && <span className="text-red-400"> *</span>}</label>}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-charcoal-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bamboo-300 focus:border-bamboo-400 transition-all resize-none"
      />
    </div>
  );
}

export function FormSelect({ label, value, onChange, options, required }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-charcoal-700 mb-1.5">{label}{required && <span className="text-red-400"> *</span>}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-bamboo-300 focus:border-bamboo-400 transition-all"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

export function PrimaryButton({ children, onClick, type = 'button', className = '', ...rest }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2.5 bg-[#1D3D12] text-white text-sm font-semibold rounded-xl hover:bg-bamboo-600 active:scale-[0.98] transition-all shadow-soft ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick, className = '', ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2.5 bg-white border border-gray-200 text-charcoal-700 text-sm font-semibold rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

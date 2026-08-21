export default function Input({ label, error, id, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-md border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted outline-none transition-colors duration-150 ${
          error
            ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
            : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/15'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}

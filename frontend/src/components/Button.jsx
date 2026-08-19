const VARIANTS = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark active:scale-[0.98] disabled:bg-slate-300 disabled:text-slate-500',
  secondary:
    'bg-white text-primary border border-primary hover:bg-primary-light active:bg-primary-light disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200',
  success:
    'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-dark active:scale-[0.98] disabled:bg-slate-300 disabled:text-slate-500',
  destructive:
    'bg-danger text-white hover:bg-danger-dark active:bg-danger-dark active:scale-[0.98] disabled:bg-slate-300 disabled:text-slate-500',
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

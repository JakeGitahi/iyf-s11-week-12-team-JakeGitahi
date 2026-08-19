export default function Avatar({ initial = '?', size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-24 h-24 text-2xl border-4 border-white',
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-primary-light text-primary font-semibold shrink-0 ${sizes[size]}`}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}

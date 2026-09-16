export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-violet-500 text-white shadow-lg shadow-violet-950/40 hover:bg-violet-400',
    secondary: 'border border-violet-400/30 bg-violet-500/10 text-violet-100 hover:bg-violet-500/20',
    danger: 'bg-rose-500 text-white shadow-lg shadow-rose-950/30 hover:bg-rose-400',
  }

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-xl border px-4 py-2.5 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#05051a] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

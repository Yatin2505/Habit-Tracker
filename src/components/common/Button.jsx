export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-lime-400 text-slate-950 hover:bg-lime-300',
    secondary: 'bg-white/5 text-zinc-100 border border-white/10 hover:bg-white/10',
    danger: 'bg-rose-500 text-white hover:bg-rose-400',
  }

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

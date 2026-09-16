import { Bell, Search } from 'lucide-react'

export default function Header({ title }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-4 backdrop-blur-md lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Overview</p>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="hidden rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:bg-white/10 sm:block"
        >
          <Search size={16} />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-300 transition hover:bg-white/10"
        >
          <Bell size={16} />
        </button>
      </div>
    </header>
  )
}

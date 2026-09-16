import { Bell, Search } from 'lucide-react'

export default function Header({ title }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-violet-950/60 bg-[#05051a]/85 px-4 py-5 backdrop-blur-md lg:px-10">
      <div>
        <p className="neon-label text-[10px] font-semibold">Overview</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="hidden rounded-xl border border-violet-500/40 bg-violet-500/10 p-2 text-violet-200 transition hover:bg-violet-500/25 sm:block"
        >
          <Search size={16} />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-xl border border-violet-500/40 bg-violet-500/10 p-2 text-violet-200 transition hover:bg-violet-500/25"
        >
          <Bell size={16} />
        </button>
      </div>
    </header>
  )
}

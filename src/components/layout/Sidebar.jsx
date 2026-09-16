import { BarChart3, CalendarDays, Home, LayoutList, Lightbulb, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/habits', label: 'My Habits', icon: LayoutList },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-[270px] shrink-0 border-r border-violet-950/60 bg-[#06061d]/95 p-6 lg:flex lg:flex-col">
      <div className="mb-8 flex items-center gap-3">
        <img src="/logo.svg" alt="HabitFlow" className="h-12 w-auto" />
      </div>

      <nav className="space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-violet-600/20 text-violet-200 ring-1 ring-violet-500/70 shadow-[0_0_24px_rgba(124,58,237,0.28)]'
                  : 'text-slate-400 hover:bg-violet-500/10 hover:text-violet-100'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-violet-500/25 bg-violet-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-300/80">focus</p>
        <p className="mt-2 text-sm text-zinc-200">Small actions compound over time.</p>
      </div>
    </aside>
  )
}

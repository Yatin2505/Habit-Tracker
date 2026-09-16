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
    <aside className="hidden w-[250px] shrink-0 border-r border-white/10 bg-slate-950/80 p-5 lg:flex lg:flex-col">
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
                  ? 'bg-lime-400/12 text-lime-300 ring-1 ring-lime-400/35'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-lime-400/20 bg-lime-400/10 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-lime-300/80">focus</p>
        <p className="mt-2 text-sm text-zinc-200">Small actions compound over time.</p>
      </div>
    </aside>
  )
}

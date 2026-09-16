import { BarChart3, CalendarDays, Home, LayoutList, Lightbulb, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/habits', label: 'Habits', icon: LayoutList },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-violet-900/60 bg-[#07071f]/95 px-2 py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] backdrop-blur-md lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-6 gap-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] transition ${
                isActive ? 'bg-violet-500/20 text-violet-200 shadow-[0_0_16px_rgba(124,58,237,0.25)]' : 'text-slate-500'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

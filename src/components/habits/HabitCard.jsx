import { Check, Flame, PencilLine, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { iconMap } from '../../utils/iconMap'
import { calculateCurrentStreak } from '../../utils/streakUtils'

export default function HabitCard({ habit, onToggle, onEdit, onDelete, onPause }) {
  const Icon = iconMap[habit.icon] || Sparkles
  const currentStreak = calculateCurrentStreak(habit)
  const today = new Date().toISOString().slice(0, 10)
  const isDone = Boolean(habit.completions?.[today])

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:border-lime-400/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`rounded-xl p-2 ${isDone ? 'bg-lime-400/15 text-lime-300' : 'bg-white/5 text-zinc-300'}`}>
            <Icon size={18} />
          </div>
          <div>
            <Link to={`/habits/${habit.id}`} className="font-medium text-white hover:text-lime-300">
              {habit.name}
            </Link>
            <p className="text-xs text-zinc-400">{habit.category}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button type="button" onClick={() => onEdit(habit)} className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 hover:text-white" aria-label={`Edit ${habit.name}`}>
            <PencilLine size={15} />
          </button>
          <button type="button" onClick={() => onDelete(habit.id)} className="rounded-lg border border-white/10 bg-white/5 p-2 text-zinc-300 hover:text-rose-300" aria-label={`Delete ${habit.name}`}>
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Current</div>
          <div className="mt-1 flex items-center gap-1 text-sm text-zinc-200">
            <Flame size={14} className="text-orange-400" />
            {currentStreak} days
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggle(habit.id)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
            isDone ? 'border-lime-400/40 bg-lime-400 text-slate-950' : 'border-white/10 bg-slate-950 text-zinc-300'
          }`}
          aria-label={`Complete ${habit.name}`}
        >
          {isDone ? <Check size={18} /> : <span className="text-lg">○</span>}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
        <span>{habit.target?.value ? `${habit.target.value} target` : 'No target'}</span>
        <button type="button" onClick={() => onPause(habit.id, !habit.paused)} className="text-lime-300 hover:text-lime-200">
          {habit.paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  )
}

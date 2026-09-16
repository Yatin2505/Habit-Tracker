import { Check, Circle, Flame } from 'lucide-react'
import { iconMap } from '../../utils/iconMap'

export default function TodayHabits({ habits, onToggle }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Today&apos;s Habits</h3>
        <span className="rounded-full bg-lime-400/10 px-2 py-1 text-xs text-lime-300">
          {habits.filter((habit) => Boolean(habit.completions?.[new Date().toISOString().slice(0, 10)])).length} / {habits.length}
        </span>
      </div>

      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-zinc-400">
            No habits scheduled today.
          </div>
        ) : (
          habits.map((habit) => {
            const Icon = iconMap[habit.icon] || Flame
            const done = Boolean(habit.completions?.[new Date().toISOString().slice(0, 10)])
            return (
              <div
                key={habit.id}
                className={`flex items-center justify-between rounded-2xl border p-3 transition ${
                  done ? 'border-lime-400/30 bg-lime-400/5' : 'border-white/10 bg-slate-950/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl p-2 ${done ? 'bg-lime-400/15 text-lime-300' : 'bg-white/5 text-zinc-300'}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{habit.name}</p>
                      {done ? <Check size={14} className="text-lime-300" /> : null}
                    </div>
                    <p className="text-xs text-zinc-400">{habit.category}</p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500">
                      <Flame size={12} className="text-orange-400" />
                      {habit.bestStreak || 0} day streak
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`Toggle ${habit.name}`}
                  onClick={() => onToggle(habit.id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                    done
                      ? 'border-lime-400/40 bg-lime-400 text-slate-950'
                      : 'border-white/10 bg-slate-950 text-zinc-300 hover:border-lime-400/30 hover:text-lime-300'
                  }`}
                >
                  {done ? <Check size={18} /> : <Circle size={18} />}
                </button>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}

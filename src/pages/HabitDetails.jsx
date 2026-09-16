import { useParams } from 'react-router-dom'
import { Flame, Trophy } from 'lucide-react'
import { useHabits } from '../hooks/useHabits'
import EmptyState from '../components/common/EmptyState'
import { calculateBestStreak, calculateCurrentStreak } from '../utils/streakUtils'
import { getHabitHistory, getHabitCompletionRate } from '../utils/habitUtils'
import HabitHeatmap from '../components/progress/HabitHeatmap'
import { buildHeatmapData } from '../utils/progressUtils'

export default function HabitDetailsPage() {
  const { id } = useParams()
  const { habits } = useHabits()
  const habit = habits.find((item) => item.id === id)

  if (!habit) {
    return <EmptyState title="Habit not found" description="The habit you’re looking for is missing or has been removed." />
  }

  const currentStreak = calculateCurrentStreak(habit)
  const bestStreak = calculateBestStreak(habit)
  const history = getHabitHistory(habit, 7)
  const completionRate = getHabitCompletionRate(habit)
  const totalCompletions = Object.values(habit.completions || {}).filter(Boolean).length
  const heatmapData = buildHeatmapData(habits, 365).map((entry) => ({ ...entry, value: entry.value }))

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Habit details</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{habit.name}</h2>
          </div>
          <div className="rounded-xl bg-lime-400/10 p-2 text-lime-300">
            <Flame size={20} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Current Streak</p>
            <p className="mt-2 text-2xl font-semibold text-white">{currentStreak} days</p>
          </div>
          <div className="rounded-2xl bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Best Streak</p>
            <p className="mt-2 text-2xl font-semibold text-white">{bestStreak} days</p>
          </div>
          <div className="rounded-2xl bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Completion Rate</p>
            <p className="mt-2 text-2xl font-semibold text-white">{completionRate}%</p>
          </div>
          <div className="rounded-2xl bg-slate-950/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Total Completions</p>
            <p className="mt-2 text-2xl font-semibold text-white">{totalCompletions}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
          <h3 className="mb-4 text-lg font-semibold text-white">7-day history</h3>
          <div className="space-y-2">
            {history.map((day) => (
              <div key={day.date} className="flex items-center gap-3 text-sm text-zinc-300">
                <span className="w-10 text-zinc-500">{day.label}</span>
                <div className="h-2 flex-1 rounded-full bg-slate-800">
                  <div className="h-2 rounded-full bg-lime-400" style={{ width: day.completed ? '100%' : '0%' }} />
                </div>
                <span>{day.completed ? '✓' : '○'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
          <h3 className="mb-4 text-lg font-semibold text-white">Milestones</h3>
          <div className="space-y-3">
            {[7, 30, 60, 100].map((milestone) => {
              const unlocked = bestStreak >= milestone
              return (
                <div key={milestone} className={`flex items-center gap-3 rounded-xl border p-3 ${unlocked ? 'border-lime-400/30 bg-lime-400/10 text-lime-300' : 'border-white/10 bg-slate-950/50 text-zinc-400'}`}>
                  <Trophy size={18} />
                  <span>🔥 {milestone} days</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <HabitHeatmap data={heatmapData} />
    </div>
  )
}

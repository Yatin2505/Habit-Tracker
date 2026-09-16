import { useHabits } from '../hooks/useHabits'
import ProgressOverview from '../components/progress/ProgressOverview'
import CompletionChart from '../components/progress/CompletionChart'
import HabitComparison from '../components/progress/HabitComparison'
import HabitHeatmap from '../components/progress/HabitHeatmap'
import { buildHeatmapData, buildMonthlyProgress, buildWeeklyChart, buildHabitComparison, calculateDisciplineScore } from '../utils/progressUtils'
import { getCompletionSummary } from '../utils/habitUtils'
import { calculateCurrentStreak, calculateBestStreak } from '../utils/streakUtils'

export default function ProgressPage() {
  const { habits } = useHabits()
  const weeklyData = buildWeeklyChart(habits)
  const monthlyData = buildMonthlyProgress(habits).map((entry) => ({
    day: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(entry.date)),
    percent: entry.percent,
  }))
  const comparisonData = buildHabitComparison(habits).slice(0, 6)
  const heatmapData = buildHeatmapData(habits, 365)
  const totalProgress = getCompletionSummary(habits)
  const currentStreak = habits.reduce((max, habit) => Math.max(max, calculateCurrentStreak(habit)), 0)
  const bestStreak = habits.reduce((max, habit) => Math.max(max, calculateBestStreak(habit)), 0)

  const overviewStats = [
    { label: 'Overall Completion', value: `${totalProgress.percent}%`, helper: `${totalProgress.completed} of ${totalProgress.total} active habits` },
    { label: 'Current Streak', value: `${currentStreak} days`, helper: 'Running streak' },
    { label: 'Best Streak', value: `${bestStreak} days`, helper: 'Personal best' },
    { label: 'Discipline Score', value: `${calculateDisciplineScore(habits)}/100`, helper: 'Consistency quality' },
  ]

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      <ProgressOverview stats={overviewStats} />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <CompletionChart data={weeklyData} />
        <HabitComparison data={comparisonData} />
      </div>
      <HabitHeatmap data={heatmapData} />
      <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
        <h3 className="mb-4 text-lg font-semibold text-white">Monthly Progress</h3>
        <div className="space-y-2">
          {monthlyData.map((entry) => (
            <div key={entry.day} className="flex items-center gap-3 text-sm text-zinc-300">
              <span className="w-24 text-zinc-400">{entry.day}</span>
              <div className="h-2 flex-1 rounded-full bg-slate-800">
                <div className="h-2 rounded-full bg-lime-400" style={{ width: `${entry.percent}%` }} />
              </div>
              <span className="w-10 text-right">{entry.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useHabits } from '../hooks/useHabits'
import WelcomeSection from '../components/dashboard/WelcomeSection'
import StatCard from '../components/dashboard/StatCard'
import DisciplineScore from '../components/dashboard/DisciplineScore'
import TodayHabits from '../components/dashboard/TodayHabits'
import WeeklyProgress from '../components/dashboard/WeeklyProgress'
import StreakSection from '../components/dashboard/StreakSection'
import { getCompletionSummary, getActiveHabits } from '../utils/habitUtils'
import { calculateBestStreak, calculateCurrentStreak } from '../utils/streakUtils'
import { buildWeeklyChart } from '../utils/progressUtils'

export default function DashboardPage() {
  const { habits, toggleHabitCompletion } = useHabits()
  const active = getActiveHabits(habits)
  const todaySummary = getCompletionSummary(habits)
  const weekData = buildWeeklyChart(habits)
  const currentStreak = active.reduce((max, habit) => Math.max(max, calculateCurrentStreak(habit)), 0)
  const bestStreak = active.reduce((max, habit) => Math.max(max, calculateBestStreak(habit)), 0)

  const lastWeekAverage = Math.round(
    weekData.slice(0, 7).reduce((sum, entry) => sum + entry.percent, 0) / Math.max(weekData.length, 1),
  )
  const delta = Math.max(0, Math.round(todaySummary.percent - lastWeekAverage))

  return (
    <div className="space-y-7 pb-24 lg:pb-8">
      <WelcomeSection />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Current Streak" value={`${currentStreak} days`} helper="Consistency compounds" accent="lime" />
        <StatCard label="Today's Progress" value={`${todaySummary.percent}%`} helper={`${todaySummary.completed} / ${todaySummary.total}`} accent="purple" />
        <StatCard label="Today's Habits" value={`${todaySummary.completed} / ${todaySummary.total}`} helper="Ready for execution" accent="cyan" />
        <StatCard label="Best Streak" value={`${bestStreak} days`} helper="Personal best" accent="rose" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <DisciplineScore score={Math.min(100, Math.max(0, Math.round(todaySummary.percent * 0.7 + lastWeekAverage * 0.3)))} delta={delta} />
        <StreakSection current={currentStreak} best={bestStreak} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <TodayHabits habits={active} onToggle={(habitId) => toggleHabitCompletion(habitId)} />
        <WeeklyProgress data={weekData} />
      </div>
    </div>
  )
}

import { formatISODate } from './dateUtils'
import { buildHeatmapData, getActiveHabits, getCompletionSummary } from './habitUtils'
import { calculateCurrentStreak, calculateBestStreak } from './streakUtils'

export { buildHeatmapData }

export const calculateDisciplineScore = (habits) => {
  const active = getActiveHabits(habits)
  if (!active.length) return 0

  const todaySummary = getCompletionSummary(habits)
  const dailyRate = todaySummary.percent

  let weeklyScore = 0
  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const key = formatISODate(date)
    const { percent } = getCompletionSummary(habits, key)
    weeklyScore += percent
  }

  const weeklyRate = Math.round(weeklyScore / 7)
  const streakContribution = active.reduce((sum, habit) => sum + calculateCurrentStreak(habit), 0)
  const streakRatio = Math.min(100, (streakContribution / Math.max(active.length * 10, 1)) * 100)

  return Math.min(100, Math.round(dailyRate * 0.5 + weeklyRate * 0.35 + streakRatio * 0.15))
}

export const buildWeeklyChart = (habits) => {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - 6)

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    const key = formatISODate(date)
    const { percent } = getCompletionSummary(habits, key)
    return { day: labels[index], percent }
  })
}

export const buildMonthlyProgress = (habits) => {
  const data = []
  for (let i = 29; i >= 0; i -= 1) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const key = formatISODate(date)
    const { percent } = getCompletionSummary(habits, key)
    data.push({ date: key, percent })
  }
  return data
}

export const buildHabitComparison = (habits) =>
  habits
    .filter((habit) => habit.active !== false)
    .map((habit) => ({
      name: habit.name,
      completion: Math.round(((Object.values(habit.completions || {}).filter(Boolean).length || 0) / Math.max(Object.keys(habit.completions || {}).length, 1)) * 100),
      streak: calculateCurrentStreak(habit),
      best: calculateBestStreak(habit),
    }))
    .sort((a, b) => b.completion - a.completion)

export const generateInsights = (habits) => {
  if (!habits.length) return ['Start by creating your first habit to unlock insights.']

  const weekdayCounts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => ({
    day,
    score: 0,
  }))

  habits.forEach((habit) => {
    Object.entries(habit.completions || {}).forEach(([dateKey, done]) => {
      if (!done) return
      const date = new Date(dateKey)
      const index = date.getDay()
      weekdayCounts[index].score += 1
    })
  })

  const strongest = [...habits].sort((a, b) => {
    const rateA = Object.values(a.completions || {}).filter(Boolean).length / Math.max(Object.keys(a.completions || {}).length, 1)
    const rateB = Object.values(b.completions || {}).filter(Boolean).length / Math.max(Object.keys(b.completions || {}).length, 1)
    return rateB - rateA
  })[0]

  const mostMissed = [...habits].sort((a, b) => {
    const missedA = Object.values(a.completions || {}).filter((value) => value === false).length
    const missedB = Object.values(b.completions || {}).filter((value) => value === false).length
    return missedB - missedA
  })[0]

  const bestDay = weekdayCounts.reduce((best, current) => (current.score > best.score ? current : best), weekdayCounts[0])
  const disciplineScore = Math.round((habits.reduce((sum, habit) => sum + calculateCurrentStreak(habit), 0) / Math.max(habits.length, 1)) * 10)

  return [
    `You are most consistent on ${bestDay.day}s.`,
    strongest ? `${strongest.name} is your strongest habit.` : 'Keep building your streak to find your strongest habit.',
    `Your discipline score is ${Math.min(100, Math.max(0, disciplineScore))} this week.`,
    mostMissed ? `${mostMissed.name} is your most frequently missed habit.` : 'Your routine is steady right now.',
    'Small, daily actions are compounding. Keep showing up.',
  ]
}

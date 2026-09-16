import { formatISODate } from './dateUtils'

export const normalizeHabit = (habit) => ({
  ...habit,
  active: habit.active !== false,
  completions: habit.completions || {},
  target: habit.target || { type: 'boolean', value: 1 },
})

export const isHabitComplete = (habit, dateKey = formatISODate()) => {
  if (!habit || !habit.completions) return false
  return Boolean(habit.completions[dateKey])
}

export const getHabitCategoryColor = (category) => {
  const map = {
    Health: 'emerald',
    Fitness: 'lime',
    Learning: 'violet',
    Career: 'cyan',
    Productivity: 'green',
    Mindfulness: 'purple',
    Personal: 'amber',
    Other: 'slate',
  }
  return map[category] || 'slate'
}

export const getActiveHabits = (habits) =>
  habits.filter((habit) => habit.active !== false && !habit.paused)

export const getTodayProgress = (habits) => {
  const active = getActiveHabits(habits)
  if (!active.length) return 0
  const completed = active.filter((habit) => isHabitComplete(habit)).length
  return Math.round((completed / active.length) * 100)
}

export const getCompletionCountForDay = (habits, dateKey = formatISODate()) => {
  const active = getActiveHabits(habits)
  return active.filter((habit) => isHabitComplete(habit, dateKey)).length
}

export const getWeekdayAverage = (habits, date = new Date()) => {
  const weekly = Array.from({ length: 7 }, (_, index) => {
    const iso = formatISODate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6 + index))
    const expected = getActiveHabits(habits).length
    const completed = expected ? getCompletionCountForDay(habits, iso) : 0
    return expected ? Math.round((completed / expected) * 100) : 0
  })
  return weekly
}

export const getCompletionSummary = (habits, dateKey = formatISODate()) => {
  const active = getActiveHabits(habits)
  if (!active.length) return { completed: 0, total: 0, percent: 0 }
  const completed = active.filter((habit) => isHabitComplete(habit, dateKey)).length
  return { completed, total: active.length, percent: Math.round((completed / active.length) * 100) }
}

export const getHabitsByDate = (habits, dateKey) => {
  const all = habits.filter((habit) => habit.active !== false)
  const completed = all.filter((habit) => isHabitComplete(habit, dateKey))
  const missed = all.filter((habit) => !isHabitComplete(habit, dateKey))

  return { completed, missed }
}

export const getHabitCompletionRate = (habit) => {
  const entries = Object.entries(habit.completions || {})
  if (!entries.length) return 0
  const completeCount = entries.filter(([, value]) => value).length
  return Math.round((completeCount / entries.length) * 100)
}

export const getHabitHistory = (habit, days = 7) => {
  const entries = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const iso = formatISODate(date)
    entries.push({
      date: iso,
      completed: Boolean(habit.completions?.[iso]),
      label: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
    })
  }
  return entries
}

export const getDateStatus = (habits, dateKey) => {
  const active = getActiveHabits(habits)
  if (!active.length) return 'missed'
  const completed = active.filter((habit) => isHabitComplete(habit, dateKey)).length
  const ratio = completed / active.length
  if (ratio === 1) return 'completed'
  if (ratio >= 0.5) return 'partial'
  return 'missed'
}

export const buildHeatmapData = (habits, days = 365) => {
  const result = []
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateKey = formatISODate(date)
    const summary = getCompletionSummary(habits, dateKey)
    result.push({
      date: dateKey,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: summary.percent,
    })
  }
  return result
}

export const getMonthlyTotals = (habits, monthDate = new Date()) => {
  const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
  const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)
  const active = getActiveHabits(habits)
  let completed = 0
  let expected = 0

  for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
    const dateKey = formatISODate(d)
    expected += active.length
    completed += active.filter((habit) => isHabitComplete(habit, dateKey)).length
  }

  return {
    completed,
    expected,
    percent: expected ? Math.round((completed / expected) * 100) : 0,
  }
}

export const getOneYearHistory = (habits) => {
  const data = []
  for (let i = 364; i >= 0; i -= 1) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateKey = formatISODate(date)
    const { percent } = getCompletionSummary(habits, dateKey)
    data.push({ date: dateKey, value: percent })
  }
  return data
}

export const getHabitCount = (habits) => habits.filter((habit) => habit.active !== false).length

export const getWeekCompletion = (habits, date = new Date(), weekStartsOn = 1) => {
  const dates = Array.from({ length: 7 }, (_, index) => {
    const d = new Date(date)
    const day = d.getDay()
    const startDelta = (day - weekStartsOn + 7) % 7
    d.setDate(d.getDate() - startDelta + index)
    return formatISODate(d)
  })

  return dates.map((dateKey) => {
    const complete = getCompletionCountForDay(habits, dateKey)
    const total = getActiveHabits(habits).length || 1
    return { date: dateKey, percent: Math.round((complete / total) * 100) }
  })
}

export const calculateMilestones = (habit) => {
  const best = habit.bestStreak ?? 0
  return [7, 30, 60, 100].map((milestone) => ({
    milestone,
    unlocked: best >= milestone,
  }))
}

export const safeParseJson = (text) => {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export const isHabitShapeValid = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  return typeof value.name === 'string' && value.name.trim().length > 0
}

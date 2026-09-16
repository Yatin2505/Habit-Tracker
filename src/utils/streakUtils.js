import { formatISODate, parseISODate } from './dateUtils'

export const calculateBestStreak = (habit) => {
  const completionDates = Object.keys(habit.completions || {})
    .filter(Boolean)
    .sort()

  if (!completionDates.length) return 0

  let best = 0
  let current = 0
  let previousDate = null

  completionDates.forEach((dateKey) => {
    const currentDate = parseISODate(dateKey)
    if (!currentDate) return

    if (!previousDate) {
      current = 1
      best = 1
      previousDate = currentDate
      return
    }

    const daysBetween = Math.round((currentDate - previousDate) / 86400000)
    if (daysBetween === 1) {
      current += 1
    } else {
      current = 1
    }

    best = Math.max(best, current)
    previousDate = currentDate
  })

  return best
}

export const calculateCurrentStreak = (habit, today = new Date()) => {
  const completions = habit.completions || {}
  const todayKey = formatISODate(today)
  const dates = Object.keys(completions)
    .filter((key) => completions[key] === true)
    .sort()

  if (!dates.length) return 0

  const lastCompleted = [...dates].reverse().find((dateKey) => dateKey <= todayKey)
  if (!lastCompleted) return 0

  const lastDate = parseISODate(lastCompleted)
  if (!lastDate) return 0

  let streak = 1
  let cursor = new Date(lastDate)

  while (true) {
    cursor.setDate(cursor.getDate() - 1)
    const key = formatISODate(cursor)
    if (completions[key]) {
      streak += 1
    } else {
      break
    }
  }

  return streak
}

export const getHabitStreakSummary = (habit) => ({
  current: calculateCurrentStreak(habit),
  best: calculateBestStreak(habit),
})

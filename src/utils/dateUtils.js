export const formatISODate = (date = new Date()) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const parseISODate = (dateString) => {
  if (!dateString) return null
  const [year, month, day] = dateString.split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

export const addDays = (date, amount) => {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export const diffInDays = (firstDate, secondDate) => {
  const a = new Date(firstDate)
  const b = new Date(secondDate)
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.floor((utc2 - utc1) / 86400000)
}

export const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export const formatLongDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))

export const formatReadableDate = (isoDate) => {
  const date = parseISODate(isoDate)
  if (!date) return 'Unknown date'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export const getMonthGrid = (date = new Date(), weekStartsOn = 1) => {
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  const startDay = new Date(firstOfMonth)
  const offset = (firstOfMonth.getDay() - weekStartsOn + 7) % 7
  startDay.setDate(firstOfMonth.getDate() - offset)

  const cells = []
  for (let i = 0; i < 42; i += 1) {
    const cellDate = addDays(startDay, i)
    cells.push(cellDate)
  }

  return cells
}

export const getWeekDates = (date = new Date(), weekStartsOn = 1) => {
  const current = new Date(date)
  current.setHours(0, 0, 0, 0)
  const day = current.getDay()
  const diff = (day - weekStartsOn + 7) % 7
  const start = addDays(current, -diff)

  return Array.from({ length: 7 }, (_, index) => addDays(start, index))
}

export const getPreviousMonths = (count = 12) => {
  const months = []
  const today = new Date()
  for (let i = count - 1; i >= 0; i -= 1) {
    const month = new Date(today.getFullYear(), today.getMonth() - i, 1)
    months.push(month)
  }
  return months
}

export const isSameDay = (dateA, dateB) => formatISODate(dateA) === formatISODate(dateB)

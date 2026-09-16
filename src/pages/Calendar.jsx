import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatISODate, getMonthGrid } from '../utils/dateUtils'
import { useHabits } from '../hooks/useHabits'
import { getDateStatus, getHabitsByDate, getCompletionSummary } from '../utils/habitUtils'

const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarPage() {
  const { habits } = useHabits()
  const [month, setMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthGrid = getMonthGrid(month, 1)
  const selectedKey = formatISODate(selectedDate)
  const status = getDateStatus(habits, selectedKey)
  const detailSummary = getCompletionSummary(habits, selectedKey)
  const { completed, missed } = getHabitsByDate(habits, selectedKey)

  const setMonthBy = (amount) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + amount, 1))
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(month)}
          </h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setMonthBy(-1)} className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-200">
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => setMonthBy(1)} className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-200">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-zinc-500">
          {weekdayNames.map((day) => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {monthGrid.map((date) => {
            const key = formatISODate(date)
            const cellStatus = getDateStatus(habits, key)
            const isSelected = formatISODate(selectedDate) === key
            const isCurrentMonth = date.getMonth() === month.getMonth()

            return (
              <button
                type="button"
                key={key}
                onClick={() => setSelectedDate(date)}
                className={`flex aspect-square flex-col items-center justify-center rounded-xl border text-sm transition ${
                  isSelected ? 'border-lime-400 bg-lime-400/12 text-white' : 'border-white/10 bg-slate-950/40 text-zinc-300'
                } ${!isCurrentMonth ? 'opacity-50' : ''}`}
              >
                <span>{date.getDate()}</span>
                <span className={`mt-1 h-2 w-2 rounded-full ${
                  cellStatus === 'completed' ? 'bg-lime-400' : cellStatus === 'partial' ? 'bg-amber-400' : 'bg-rose-400'
                }`} />
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
        <h3 className="text-xl font-semibold text-white">{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(selectedDate)}</h3>
        <p className="mt-2 text-sm text-zinc-400">Status: {status}</p>
        <p className="mt-2 text-lg text-white">Completed: {detailSummary.completed} / {detailSummary.total}</p>

        <div className="mt-4 space-y-2">
          {completed.length ? completed.map((habit) => (
            <div key={habit.id} className="flex items-center gap-2 text-sm text-lime-300">
              <span>✓</span>
              <span>{habit.name}</span>
            </div>
          )) : null}

          {missed.length ? missed.map((habit) => (
            <div key={habit.id} className="flex items-center gap-2 text-sm text-rose-300">
              <span>×</span>
              <span>{habit.name}</span>
            </div>
          )) : null}
        </div>
      </div>
    </div>
  )
}

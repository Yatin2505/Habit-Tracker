import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import defaultHabits from '../data/defaultHabits'
import { formatISODate } from '../utils/dateUtils'
import { normalizeHabit, safeParseJson } from '../utils/habitUtils'
import { useLocalStorage } from './useLocalStorage'

const HabitContext = createContext(null)

export function HabitProvider({ children }) {
  const [habits, setHabits] = useLocalStorage('habitflow_habits', [])
  const [bootstrapped, setBootstrapped] = useState(false)

  useEffect(() => {
    if (bootstrapped) return

    const loadHabits = async () => {
      try {
        const response = await fetch('/api/habits')
        if (!response.ok) throw new Error('Habit API request failed')
        const payload = await response.json()
        const remoteHabits = Array.isArray(payload.habits)
          ? payload.habits.map(normalizeHabit).filter(Boolean)
          : []

        if (remoteHabits.length) {
          setHabits(remoteHabits)
        } else {
          const stored = safeParseJson(window.localStorage.getItem('habitflow_habits') ?? 'null')
          const localHabits = Array.isArray(stored) ? stored.map(normalizeHabit).filter(Boolean) : []
          const initial = localHabits.length ? localHabits : defaultHabits()
          setHabits(initial)
          await fetch('/api/habits', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ habits: initial }),
          })
        }
      } catch (error) {
        console.error('Unable to load habits from MongoDB:', error)
        const stored = safeParseJson(window.localStorage.getItem('habitflow_habits') ?? 'null')
        const localHabits = Array.isArray(stored) ? stored.map(normalizeHabit).filter(Boolean) : []
        setHabits(localHabits.length ? localHabits : defaultHabits())
      }

      setBootstrapped(true)
    }

    loadHabits()
  }, [bootstrapped, setHabits])

  useEffect(() => {
    if (!bootstrapped) return

    const saveHabits = async () => {
      try {
        const response = await fetch('/api/habits', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ habits }),
        })
        if (!response.ok) throw new Error('Habit API save failed')
      } catch (error) {
        console.error('Unable to save habits to MongoDB:', error)
      }
    }

    saveHabits()
  }, [bootstrapped, habits])

  const addHabit = useCallback((habit) => {
    const nextHabit = normalizeHabit({
      ...habit,
      id: habit.id || crypto.randomUUID(),
      createdAt: habit.createdAt || formatISODate(),
      completions: habit.completions || {},
      active: habit.active !== false,
    })

    setHabits((previous) => [nextHabit, ...previous])
  }, [setHabits])

  const updateHabit = useCallback((id, updates) => {
    setHabits((previous) =>
      previous.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              ...updates,
              completions: updates.completions || habit.completions || {},
              active: updates.active !== undefined ? updates.active : habit.active,
            }
          : habit,
      ),
    )
  }, [setHabits])

  const deleteHabit = useCallback((id) => {
    setHabits((previous) => previous.filter((habit) => habit.id !== id))
  }, [setHabits])

  const toggleHabitCompletion = useCallback((id, dateKey = formatISODate()) => {
    setHabits((previous) =>
      previous.map((habit) => {
        if (habit.id !== id) return habit
        const currentValue = Boolean(habit.completions?.[dateKey])
        return {
          ...habit,
          completions: {
            ...(habit.completions || {}),
            [dateKey]: !currentValue,
          },
        }
      }),
    )
  }, [setHabits])

  const setHabitPaused = useCallback((id, paused) => {
    setHabits((previous) =>
      previous.map((habit) =>
        habit.id === id
          ? { ...habit, paused, active: paused ? false : habit.active }
          : habit,
      ),
    )
  }, [setHabits])

  const value = useMemo(
    () => ({ habits, setHabits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion, setHabitPaused }),
    [habits, setHabits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion, setHabitPaused],
  )

  return createElement(HabitContext.Provider, { value }, children)
}

export function useHabits() {
  const context = useContext(HabitContext)
  if (!context) {
    throw new Error('useHabits must be used within HabitProvider')
  }
  return context
}

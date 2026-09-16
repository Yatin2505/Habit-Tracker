import { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const emptyProfile = { name: '', age: '' }

export default function ProfileSetup() {
  const [profile, setProfile] = useLocalStorage('habitflow_profile', emptyProfile)
  const [name, setName] = useState(profile.name || '')
  const [age, setAge] = useState(profile.age || '')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    const numericAge = Number(age)

    if (!trimmedName) {
      setError('Please enter your name.')
      return
    }
    if (!Number.isInteger(numericAge) || numericAge < 1 || numericAge > 120) {
      setError('Please enter an age between 1 and 120.')
      return
    }
    setProfile({ name: trimmedName, age: numericAge })
  }

  if (profile.name && profile.age) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.28em] text-lime-300">Welcome to HabitFlow</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Let&apos;s set up your profile</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-300">
          Tell us your name and age so HabitFlow can personalize your experience. You can change these details later in Settings.
        </p>
        <div className="mt-6 space-y-4">
          <label className="block text-sm text-zinc-200">
            Your name
            <input value={name} onChange={(event) => setName(event.target.value)} autoFocus className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none focus:border-lime-400" />
          </label>
          <label className="block text-sm text-zinc-200">
            Your age
            <input type="number" min="1" max="120" value={age} onChange={(event) => setAge(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none focus:border-lime-400" />
          </label>
        </div>
        {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}
        <button type="submit" className="mt-6 w-full rounded-xl bg-lime-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-lime-300">
          Start using HabitFlow
        </button>
      </form>
    </div>
  )
}

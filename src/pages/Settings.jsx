import { useRef } from 'react'
import { Download, Import, RotateCcw, ShieldAlert } from 'lucide-react'
import { useHabits } from '../hooks/useHabits'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { isHabitShapeValid, safeParseJson } from '../utils/habitUtils'

export default function SettingsPage() {
  const { habits, setHabits } = useHabits()
  const [theme, setTheme] = useLocalStorage('habitflow_theme', 'dark')
  const [weekStartsOn, setWeekStartsOn] = useLocalStorage('habitflow_week_start', 'Monday')
  const [profile, setProfile] = useLocalStorage('habitflow_profile', { name: '', age: '' })
  const inputRef = useRef(null)

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(habits, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'habitflow-backup.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const parsed = safeParseJson(text)
    if (!Array.isArray(parsed) || !parsed.every(isHabitShapeValid)) {
      window.alert('The imported file is not a valid habit backup.')
      event.target.value = ''
      return
    }

    setHabits(parsed)
    event.target.value = ''
  }

  const handleReset = () => {
    const confirmed = window.confirm('This will permanently delete all habits and history.\n\nContinue?')
    if (!confirmed) return
    setHabits([])
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
        <h2 className="text-2xl font-semibold text-white">Settings</h2>

        <div className="mt-6 space-y-6">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-zinc-500">Your profile</p>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm text-zinc-300">
                Name
                <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-white outline-none focus:border-lime-400" />
              </label>
              <label className="text-sm text-zinc-300">
                Age
                <input type="number" min="1" max="120" value={profile.age} onChange={(event) => setProfile({ ...profile, age: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-white outline-none focus:border-lime-400" />
              </label>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-zinc-500">Appearance</p>
            <div className="grid gap-3 md:grid-cols-3">
              {['Dark', 'Light', 'System'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTheme(option.toLowerCase())}
                  className={`rounded-xl border px-3 py-2 text-left ${
                    theme === option.toLowerCase() ? 'border-lime-400 bg-lime-400/10 text-lime-300' : 'border-white/10 bg-slate-950/50 text-zinc-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-zinc-500">Preferences</p>
            <div className="grid gap-3 md:grid-cols-2">
              {['Monday', 'Sunday'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setWeekStartsOn(option)}
                  className={`rounded-xl border px-3 py-2 text-left ${
                    weekStartsOn === option ? 'border-lime-400 bg-lime-400/10 text-lime-300' : 'border-white/10 bg-slate-950/50 text-zinc-300'
                  }`}
                >
                  Week starts on: {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-zinc-500">Data</p>
            <div className="grid gap-3 md:grid-cols-3">
              <button type="button" onClick={handleExport} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-zinc-200 hover:bg-white/10">
                <Download size={16} /> Export Data
              </button>
              <button type="button" onClick={() => inputRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-zinc-200 hover:bg-white/10">
                <Import size={16} /> Import Data
              </button>
              <button type="button" onClick={handleReset} className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-rose-300 hover:bg-rose-500/15">
                <RotateCcw size={16} /> Reset All Data
              </button>
            </div>
            <input ref={inputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-4 text-amber-200">
        <div className="flex items-center gap-3">
          <ShieldAlert size={18} />
          <span className="font-medium">Resetting will delete habit history permanently.</span>
        </div>
      </div>
    </div>
  )
}

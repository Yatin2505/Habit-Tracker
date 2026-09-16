import { useEffect, useState } from 'react'
import { BookOpen, BrainCircuit, Clock3, Droplets, Dumbbell, Flame, Smartphone, Sparkles, SunMedium, Target, Zap } from 'lucide-react'
import Button from '../common/Button'

const iconOptions = [
  { value: 'Dumbbell', label: 'Dumbbell', Icon: Dumbbell },
  { value: 'BookOpen', label: 'Book', Icon: BookOpen },
  { value: 'BrainCircuit', label: 'Brain', Icon: BrainCircuit },
  { value: 'Droplets', label: 'Water', Icon: Droplets },
  { value: 'Smartphone', label: 'Focus', Icon: Smartphone },
  { value: 'Sunrise', label: 'Sunrise', Icon: SunMedium },
  { value: 'Flame', label: 'Flame', Icon: Flame },
  { value: 'Sparkles', label: 'Sparkles', Icon: Sparkles },
  { value: 'Target', label: 'Target', Icon: Target },
  { value: 'Zap', label: 'Energy', Icon: Zap },
  { value: 'Clock3', label: 'Clock', Icon: Clock3 },
]

const categoryOptions = ['Health', 'Fitness', 'Learning', 'Career', 'Productivity', 'Mindfulness', 'Personal', 'Other']
const frequencyOptions = ['Daily', 'Weekdays', 'Weekly', 'Custom']

export default function HabitForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Productivity',
    icon: 'Sparkles',
    frequency: 'Daily',
    target: '',
    active: true,
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        description: initialData.description || '',
        category: initialData.category || 'Productivity',
        icon: initialData.icon || 'Sparkles',
        frequency: initialData.frequency || 'Daily',
        target: initialData.target?.value || '',
        active: initialData.active !== false,
      })
    }
  }, [initialData])

  const handleChange = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = form.name.trim()
    if (!name) {
      window.alert('Habit name is required.')
      return
    }

    onSubmit({
      ...initialData,
      name,
      description: form.description.trim(),
      category: form.category,
      icon: form.icon,
      frequency: form.frequency,
      target: form.target ? { type: 'text', value: form.target } : { type: 'boolean', value: 1 },
      active: form.active,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm text-zinc-300">Habit name</label>
        <input
          value={form.name}
          onChange={(event) => handleChange('name', event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-white outline-none ring-0 transition focus:border-lime-400"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">Description</label>
        <textarea
          value={form.description}
          onChange={(event) => handleChange('description', event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-lime-400"
          rows="3"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-zinc-300">Category</label>
          <select
            value={form.category}
            onChange={(event) => handleChange('category', event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-lime-400"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">Frequency</label>
          <select
            value={form.frequency}
            onChange={(event) => handleChange('frequency', event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-lime-400"
          >
            {frequencyOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">Icon</label>
        <div className="grid grid-cols-5 gap-2">
          {iconOptions.map(({ value, label, Icon }) => (
            <button
              type="button"
              key={value}
              onClick={() => handleChange('icon', value)}
              className={`flex flex-col items-center gap-2 rounded-xl border p-2 transition ${
                form.icon === value ? 'border-lime-400 bg-lime-400/10 text-lime-300' : 'border-white/10 bg-slate-950 text-zinc-300'
              }`}
              aria-label={label}
              title={label}
            >
              <Icon size={18} />
              <span className="text-[10px]">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">Target</label>
        <input
          value={form.target}
          onChange={(event) => handleChange('target', event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-lime-400"
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950 p-3">
        <div>
          <p className="font-medium text-white">Active</p>
          <p className="text-xs text-zinc-500">Include in today&apos;s habits</p>
        </div>
        <button
          type="button"
          onClick={() => handleChange('active', !form.active)}
          className={`relative h-6 w-11 rounded-full transition ${form.active ? 'bg-lime-400' : 'bg-slate-700'}`}
          aria-label="Toggle activity"
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${form.active ? 'left-6' : 'left-1'}`}
          />
        </button>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10">
          Cancel
        </button>
        <Button type="submit">Save Habit</Button>
      </div>
    </form>
  )
}

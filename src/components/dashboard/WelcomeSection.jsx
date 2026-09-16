import { Crown } from 'lucide-react'
import { getGreeting } from '../../utils/dateUtils'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export default function WelcomeSection() {
  const [profile] = useLocalStorage('habitflow_profile', { name: 'there', age: '' })
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <section className="neon-panel rounded-3xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="neon-label text-xs font-semibold">{getGreeting()}</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">{profile.name || 'there'} <Crown className="mb-1 inline text-violet-300" size={30} /></h2>
          <p className="mt-3 max-w-xl text-sm text-slate-300">
            Stay consistent. Small actions compound{profile.age ? ` at age ${profile.age}.` : '.'}
          </p>
        </div>
        <div className="rounded-2xl border border-violet-400/40 bg-violet-500/15 p-3 text-violet-300">
          <Crown size={20} />
        </div>
      </div>
      <div className="mt-5 text-sm text-slate-400">{today}</div>
    </section>
  )
}

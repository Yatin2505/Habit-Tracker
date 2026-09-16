import { Sparkles } from 'lucide-react'
import { getGreeting } from '../../utils/dateUtils'

export default function WelcomeSection() {
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-900 to-lime-500/5 p-5 shadow-xl shadow-slate-950/20 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">{getGreeting()}</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Yatin 👋</h2>
          <p className="mt-2 max-w-xl text-sm text-zinc-300">Stay consistent. Small actions compound.</p>
        </div>
        <div className="rounded-2xl border border-lime-400/20 bg-lime-400/10 p-3 text-lime-300">
          <Sparkles size={18} />
        </div>
      </div>
      <div className="mt-4 text-sm text-zinc-400">{today}</div>
    </section>
  )
}

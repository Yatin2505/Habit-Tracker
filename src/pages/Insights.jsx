import { Lightbulb } from 'lucide-react'
import { useHabits } from '../hooks/useHabits'
import { generateInsights } from '../utils/progressUtils'

export default function InsightsPage() {
  const { habits } = useHabits()
  const insights = generateInsights(habits)

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-violet-500/10 p-2 text-violet-300">
          <Lightbulb size={18} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Insight engine</p>
          <h2 className="text-2xl font-semibold text-white">Performance insights</h2>
        </div>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 text-zinc-200">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-full bg-lime-400/10 p-1 text-lime-300">•</span>
              <p>{insight}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

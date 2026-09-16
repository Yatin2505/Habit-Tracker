import { Flame } from 'lucide-react'

export default function StreakSection({ current, best }) {
  return (
    <div className="neon-panel rounded-3xl p-6">
      <div className="flex items-center gap-2 text-violet-300">
        <Flame size={16} />
        <span className="text-xs uppercase tracking-[0.24em]">streak</span>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <p className="text-slate-400">Current streak</p>
          <div className="mt-1 text-3xl font-semibold text-white">{current} days</div>
        </div>
        <div>
          <p className="text-slate-400">Best streak</p>
          <div className="mt-1 text-3xl font-semibold text-white">{best} days</div>
        </div>
      </div>
    </div>
  )
}

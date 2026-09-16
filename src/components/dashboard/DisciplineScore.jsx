export default function DisciplineScore({ score, delta }) {
  const tone = score >= 80 ? 'Excellent consistency' : score >= 60 ? 'Solid momentum' : 'Build the rhythm'

  return (
    <div className="neon-panel rounded-3xl p-6">
      <p className="neon-label text-xs font-semibold">Discipline score</p>
      <div className="mt-4 flex items-end gap-3">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="pb-1 text-sm text-slate-400">/ 100</span>
      </div>
      <p className="mt-3 text-lg font-semibold text-fuchsia-300">{tone}</p>
      <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
        <span className="text-violet-300">↑</span>
        {delta}% from last week
      </p>
    </div>
  )
}

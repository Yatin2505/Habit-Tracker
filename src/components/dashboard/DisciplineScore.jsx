export default function DisciplineScore({ score, delta }) {
  const tone = score >= 80 ? 'Excellent consistency' : score >= 60 ? 'Solid momentum' : 'Build the rhythm'

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-5 shadow-xl shadow-slate-950/20">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">Discipline score</p>
      <div className="mt-4 flex items-end gap-3">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="pb-1 text-sm text-zinc-400">/ 100</span>
      </div>
      <p className="mt-3 text-lg text-lime-300">{tone}</p>
      <p className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
        <span className="text-lime-300">↑</span>
        {delta}% from last week
      </p>
    </div>
  )
}

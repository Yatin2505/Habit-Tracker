export default function StatCard({ label, value, helper, accent = 'lime' }) {
  const accentMap = {
    lime: 'bg-lime-400/10 text-lime-300',
    purple: 'bg-violet-500/10 text-violet-300',
    cyan: 'bg-cyan-500/10 text-cyan-300',
    rose: 'bg-rose-500/10 text-rose-300',
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-lg shadow-slate-950/20">
      <div className={`mb-3 inline-flex rounded-xl px-2 py-1 text-xs font-medium ${accentMap[accent] || accentMap.lime}`}>
        {label}
      </div>
      <div className="text-3xl font-semibold text-white">{value}</div>
      {helper ? <div className="mt-1 text-xs text-zinc-400">{helper}</div> : null}
    </div>
  )
}

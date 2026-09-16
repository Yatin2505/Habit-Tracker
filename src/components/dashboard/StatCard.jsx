export default function StatCard({ label, value, helper, accent = 'lime' }) {
  const accentMap = {
    lime: 'bg-violet-500/15 text-violet-200',
    purple: 'bg-fuchsia-500/15 text-fuchsia-200',
    cyan: 'bg-indigo-500/15 text-indigo-200',
    rose: 'bg-purple-500/15 text-purple-200',
  }

  return (
    <div className="neon-panel rounded-2xl p-5">
      <div className={`mb-3 inline-flex rounded-xl px-2 py-1 text-xs font-medium ${accentMap[accent] || accentMap.lime}`}>
        {label}
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      {helper ? <div className="mt-1 text-xs text-zinc-400">{helper}</div> : null}
    </div>
  )
}

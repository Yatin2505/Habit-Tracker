export default function ProgressOverview({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/90 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{stat.label}</p>
          <div className="mt-3 text-3xl font-semibold text-white">{stat.value}</div>
          <p className="mt-1 text-xs text-zinc-400">{stat.helper}</p>
        </div>
      ))}
    </div>
  )
}

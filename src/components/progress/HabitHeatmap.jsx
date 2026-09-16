import { useMemo } from 'react'

const levelClasses = ['bg-slate-800', 'bg-lime-500/20', 'bg-lime-500/35', 'bg-lime-500/55', 'bg-lime-500/75', 'bg-lime-400']

export default function HabitHeatmap({ data }) {
  const cells = useMemo(() => {
    return data.map((entry) => {
      const index = entry.value <= 0 ? 0 : entry.value <= 25 ? 1 : entry.value <= 50 ? 2 : entry.value <= 75 ? 3 : entry.value <= 99 ? 4 : 5
      return { ...entry, className: levelClasses[index] }
    })
  }, [data])

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">Consistency Heatmap</h3>
      <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Less</span>
        <span>More</span>
      </div>
      <div className="grid grid-cols-7 gap-1 sm:grid-cols-14">
        {cells.map((entry) => (
          <div
            key={entry.date}
            className={`h-4 w-4 rounded-sm ${entry.className}`}
            title={`${entry.label}: ${entry.value}%`}
          />
        ))}
      </div>
    </div>
  )
}

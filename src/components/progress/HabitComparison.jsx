export default function HabitComparison({ data }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">Habit Comparison</h3>
      <div className="space-y-3">
        {data.map((habit) => (
          <div key={habit.name}>
            <div className="mb-1 flex items-center justify-between text-sm text-zinc-300">
              <span>{habit.name}</span>
              <span>{habit.completion}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-gradient-to-r from-lime-400 to-violet-500" style={{ width: `${habit.completion}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

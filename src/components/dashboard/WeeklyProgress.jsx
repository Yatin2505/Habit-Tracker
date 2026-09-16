import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function WeeklyProgress({ data }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/90 p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Weekly Progress</h3>
        <span className="text-sm text-zinc-400">7-day average: {Math.round(data.reduce((sum, item) => sum + item.percent, 0) / data.length)}%</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px' }}
              formatter={(value) => [`${value}%`, 'Completion']}
            />
            <Bar dataKey="percent" radius={[8, 8, 0, 0]} fill="#a3e635" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function CompletionChart({ data }) {
  return (
    <div className="h-72 rounded-3xl border border-white/10 bg-slate-900/90 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">Weekly Completion</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} domain={[0, 100]} />
          <Tooltip
            formatter={(value) => [`${value}%`, 'Completion']}
            contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px' }}
          />
          <Bar dataKey="percent" radius={[8, 8, 0, 0]} fill="#a3e635" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

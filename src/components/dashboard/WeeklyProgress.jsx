import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function WeeklyProgress({ data }) {
  return (
    <section className="neon-panel rounded-3xl p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Weekly Progress</h3>
        <span className="text-sm text-slate-400">7-day average: {Math.round(data.reduce((sum, item) => sum + item.percent, 0) / data.length)}%</span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#312e81" vertical={false} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#a78bfa', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#a78bfa', fontSize: 12 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#0b0b2b', border: '1px solid rgba(139,92,246,0.5)', borderRadius: '12px' }}
              formatter={(value) => [`${value}%`, 'Completion']}
            />
            <Bar dataKey="percent" radius={[8, 8, 0, 0]} fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

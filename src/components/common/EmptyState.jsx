export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/70 p-8 text-center">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

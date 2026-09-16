export default function EmptyState({ title, description, action }) {
  return (
    <div className="neon-panel rounded-2xl border-dashed p-8 text-center">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

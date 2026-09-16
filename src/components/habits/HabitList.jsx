import HabitCard from './HabitCard'

export default function HabitList({ habits, onToggle, onEdit, onDelete, onPause }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          onPause={onPause}
        />
      ))}
    </div>
  )
}

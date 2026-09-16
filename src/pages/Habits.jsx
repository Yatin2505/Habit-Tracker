import { useState } from 'react'
import { Plus } from 'lucide-react'
import AddHabitModal from '../components/habits/AddHabitModal'
import HabitList from '../components/habits/HabitList'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import ConfirmDialog from '../components/common/ConfirmDialog'
import { useHabits } from '../hooks/useHabits'

export default function HabitsPage() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion, setHabitPaused } = useHabits()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const openCreateModal = () => {
    setEditingHabit(null)
    setIsModalOpen(true)
  }

  const handleSave = (habitPayload) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, habitPayload)
    } else {
      addHabit(habitPayload)
    }
    setEditingHabit(null)
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteHabit(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Habits</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">My Habits</h2>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus size={16} />
          Add Habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <EmptyState
          title="No habits yet."
          description="Build your first habit and start tracking your consistency."
          action={<Button onClick={openCreateModal}>Create your first habit</Button>}
        />
      ) : (
        <HabitList
          habits={habits}
          onToggle={(id) => toggleHabitCompletion(id)}
          onEdit={(habit) => {
            setEditingHabit(habit)
            setIsModalOpen(true)
          }}
          onDelete={(id) => setDeleteId(id)}
          onPause={(id, paused) => setHabitPaused(id, paused)}
        />
      )}

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingHabit(null)
        }}
        onSubmit={handleSave}
        initialData={editingHabit}
      />

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete habit?"
        description="This will permanently remove this habit and its history."
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
        confirmLabel="Delete"
      />
    </div>
  )
}

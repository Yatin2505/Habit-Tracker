import Modal from '../common/Modal'
import HabitForm from './HabitForm'

export default function AddHabitModal({ isOpen, onClose, onSubmit, initialData }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Habit' : 'Add Habit'} size="lg">
      <HabitForm initialData={initialData} onSubmit={(values) => {
        onSubmit(values)
        onClose()
      }} onCancel={onClose} />
    </Modal>
  )
}

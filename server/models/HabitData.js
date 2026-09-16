import mongoose from 'mongoose'

const habitDataSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    habits: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  { timestamps: true },
)

export const HabitData = mongoose.model('HabitData', habitDataSchema)

import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { HabitData } from './models/HabitData.js'

const app = express()
const userId = process.env.HABITFLOW_USER_ID || 'local-user'

app.use(cors())
app.use(express.json({ limit: '1mb' }))

const isValidHabit = (habit) =>
  habit &&
  typeof habit === 'object' &&
  typeof habit.id === 'string' &&
  typeof habit.name === 'string' &&
  habit.name.trim().length > 0 &&
  habit.completions &&
  typeof habit.completions === 'object'

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting',
  })
})

app.get('/api/habits', async (_request, response, next) => {
  try {
    const record = await HabitData.findOne({ userId }).lean()
    response.json({ habits: record?.habits || [] })
  } catch (error) {
    next(error)
  }
})

app.put('/api/habits', async (request, response, next) => {
  try {
    const { habits } = request.body
    if (!Array.isArray(habits) || !habits.every(isValidHabit)) {
      return response.status(400).json({ error: 'Invalid habits payload.' })
    }

    const record = await HabitData.findOneAndUpdate(
      { userId },
      { $set: { habits } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
    ).lean()

    return response.json({ habits: record.habits })
  } catch (error) {
    return next(error)
  }
})

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'Unable to save habit data.' })
})

export default app

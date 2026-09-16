import { useCallback, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item === null) return initialValue
      const parsed = JSON.parse(item)
      return parsed ?? initialValue
    } catch (error) {
      console.error(`Unable to read ${key} from local storage:`, error)
      return initialValue
    }
  })

  const setPersistedValue = useCallback(
    (nextValue) => {
      setValue((currentValue) => {
        const resolvedValue = typeof nextValue === 'function' ? nextValue(currentValue) : nextValue

        try {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue))
        } catch (error) {
          console.error(`Unable to save ${key} to local storage:`, error)
        }

        return resolvedValue
      })
    },
    [key],
  )

  return [value, setPersistedValue]
}

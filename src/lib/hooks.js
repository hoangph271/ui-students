import { useState } from 'react'

export const useStatus = () => {
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)

  const Status = props => {
    if (error) return props.error(error)

    if (results) {
      return results.length === 0 ? props.empty() : props.success(results)
    }

    return props.loading()
  }

  return { Status, setError, setResults }
}

export const useInput = (init = '') => {
  const [value, setValue] = useState(init)

  const onChanged = e => {
    e.preventDefault()

    setValue(e.target.value)
  }

  return [value, onChanged, setValue]
}

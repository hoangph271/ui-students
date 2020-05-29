import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { postApi } from '../lib/api'
import { useInput } from '../lib/hooks'

const StudentForm = ({ className, onStudentCreated }) => {
  const [name, onNameChanged, setName] = useInput()
  const [level, onLevelChanged, setLevel] = useInput()
  const [age, onAgeChanged, setAge] = useInput()
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateClicked = async e => {
    e.preventDefault()
    setIsLoading(true)

    const res = await postApi({
      url: '/student',
      body: {
        name,
        level,
        age: age.length > 0 ? Number(age) : null
      }
    })

    if (res.ok) {
      const { _id } = await res.json()
      onStudentCreated(_id)
      setName('')
      setLevel('')
      setAge('')
    } else {
      toast.error(await res.text())
    }

    setIsLoading(false)
  }

  return (
    <form className={className}>
      <input value={name} onChange={onNameChanged} placeholder="name" />
      <input
        value={age}
        onChange={onAgeChanged}
        placeholder="age"
        type="number"
      />
      <input value={level} onChange={onLevelChanged} placeholder="level" />
      <input type="submit" disabled={isLoading} value="Create" onClick={handleCreateClicked} />
    </form>
  )
}

export default styled(StudentForm)`
  display: grid;
  grid-gap: 0.4rem;

  input {
    background: none;
    outline: none;
    border: none;
    padding: 0.4rem 0.2rem;
    box-shadow: 0 0 5px rgba(99, 110, 114, 1.0);
    border-radius: 4px;
  }
  input[type="submit"] {
    background-color: #00b894;
    box-shadow: 0 0 5px rgba(99, 110, 114, 1.0);
  }
  input[type="submit"]:disabled {
    background-color: #636e72;
  }
  input:focus, input[type="submit"]:hover {
    box-shadow: 0 0 10px rgba(45, 52, 54, 1.0);
  }
  input:hover {
    cursor: pointer;
  }
`

import React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { postApi } from '../lib/api'
import { useInput } from '../lib/hooks'

const StudentForm = ({ className, onStudentCreated }) => {
  const [name, onNameChanged] = useInput()
  const [level, onLevelChanged] = useInput()
  const [age, onAgeChanged] = useInput()

  const handleCreateClicked = async e => {
    e.preventDefault()

    const res = await postApi({
      url: '/student',
      body: {
        name,
        level,
        age: age.length > 0 ? Number(age) : null
      }
    })

    if (res.ok) {
      onStudentCreated()
    } else {
      toast(await res.text())
    }
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
      <input type="submit" value="Create" onClick={handleCreateClicked} />
    </form>
  )
}

export default styled(StudentForm)`
  display: flex;
  flex-direction: column;

  input:hover {
    cursor: pointer;
  }
`

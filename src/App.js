import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { getApi, postApi } from './lib/api'
import { useInput, useStatus } from './lib/hooks'

const StudentForm = ({ onStudentCreated }) => {
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
    <form style={{ display: 'flex', flexDirection: 'column' }}>
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

const App = ({ className }) => {
  const [updatedAt, setUpdatedAt] = useState(Date.now())

  return (
    <main className={className}>
      <StudentForm onStudentCreated={() => setUpdatedAt(Date.now())} />
      <StudentList key={updatedAt} />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  )
}

export default styled(App)`
  .App {
    font-family: sans-serif;
    text-align: center;
  }
`

const StudentList = () => {
  const { Status, setResults, setError } = useStatus()

  useEffect(() => {
    let isMounted = true

    getApi({ url: '/student' })
      .then(students => isMounted && setResults(students))
      .catch(error => isMounted && setError(error))

    return () => {
      isMounted = false
    }
  }, [setError, setResults])

  return (
    <Status
      loading={() => <div>{'...'}</div>}
      empty={() => <div>{'Ø'}</div>}
      error={error => <pre>{error.message}</pre>}
      success={students => (
        <ul>
          {students.map(student => (
            <li key={student._id}>
              <span>{student.name}</span>
              {' - '}
              <span>{`a ${student.age} year${
                student.age ? 's' : ''
              } old`}</span>
              {student.level && <span>{` ${student.level}`}</span>}
            </li>
          ))}
        </ul>
      )}
    />
  )
}

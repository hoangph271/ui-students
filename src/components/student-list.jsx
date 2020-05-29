import React, { useEffect } from 'react'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { getApi } from '../lib/api'
import { useStatus } from '../lib/hooks'

const StudentList = ({ className }) => {
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

export default styled(StudentList)`

`

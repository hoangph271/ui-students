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
      .then(async res => {
        if (!(isMounted)) return

        if (res.ok) {
          isMounted && setResults(await res.json())
        } else {
          isMounted && setError(await res.text())
        }
      })
      .catch(error => isMounted && setError(error))

    return () => {
      isMounted = false
    }
  }, [setError, setResults])

  return (
    <div className={className}>
      <Status
        loading={() => <div>{'...'}</div>}
        empty={() => <div>{'Ø'}</div>}
        error={error => <pre>{error.message}</pre>}
        success={students => (
          <ul>
            {students.map(student => (
              <li key={student._id}>
                <div className="age">{student.age}</div>
                <div className="detail">
                  <span className="name">{student.name}</span>
                  <span>{student.level}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  )
}

export default styled(StudentList)`
  ul {
    box-sizing: border-box;
    max-height: 100vh;
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-columns: 100%;
    grid-auto-rows: auto;
    grid-gap: 0.4rem;
    padding: 0.6rem;
    overflow: auto;
  }

  li {
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(99, 110, 114, 1.0);
    padding: 0.4rem;
    display: flex;
    align-items: center;

    .age {
      font-size: large;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      box-shadow: inset 0 0 5px rgba(99, 110, 114, 1.0);
      background-image: linear-gradient(to top right, rgba(178, 190, 195, 0.6) 0%, rgba(178, 190, 195, 0.8) 35%, rgba(178, 190, 195, 0.6) 65%);
    }

    .detail {
      flex-grow: 1;
      display: flex;
      margin-left: 0.4rem;
      flex-direction: column;

      .name {
        font-weight: bold;
      }
    }

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 10px rgba(45, 52, 54, 1.0);
    }
  }
`

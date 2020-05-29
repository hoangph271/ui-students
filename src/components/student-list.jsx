import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { getApi, deleteApi } from '../lib/api'
import { useStatus } from '../lib/hooks'

const StudentList = ({ className, newStudentId }) => {
  const { Status, setResults, setError } = useStatus()
  const [loadingMore, setLoadingMore] = useState(null)

  useEffect(() => {
    if (!(newStudentId)) return

    setLoadingMore(true)

    getApi({ url: `/student/${newStudentId}` })
      .then(async res => {
        if (res.ok) {
          const student = await res.json()
          setResults(students => [...students, student])
        } else {
          toast.error(await res.text())
        }

        setLoadingMore(false)
      })
  }, [newStudentId])

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

  const handleDeleteStudent = async _id => {
    const res = await deleteApi({ url: `/student/${_id}` })

    if (res.ok) {
      setResults(students => students.filter(student => student._id !== _id))
    } else {
      toast.error(await res.text())
    }
  }

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
                <div className="circle age">{student.age}</div>
                <div className="detail">
                  <span className="name">{student.name}</span>
                  <span>{student.level || '?'}</span>
                </div>
                <div>
                  <div
                    onClick={() => handleDeleteStudent(student._id)}
                    className="circle delete"
                  >
                    {'✖'}
                  </div>
                </div>
              </li>
            ))}
            {loadingMore && <li>{'...'}</li>}
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

    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      box-shadow: inset 0 0 5px rgba(99, 110, 114, 1.0);
      background-image: linear-gradient(to top right, rgba(178, 190, 195, 0.6) 0%, rgba(178, 190, 195, 0.8) 35%, rgba(178, 190, 195, 0.6) 65%);
    }

    .age {
      font-size: large;
    }
    .delete {
      cursor: pointer;
      background-image: linear-gradient(to top right, rgba(214, 48, 49, 0.8) 0%, rgba(214, 48, 49, 1.0) 35%, rgba(214, 48, 49, 0.8) 65%);
    }
    .delete:hover {
      box-shadow: inset 0 0 15px rgba(45, 52, 54, 1.0);
    }

    .detail {
      flex-basis: 0;
      flex-grow: 1;
      display: flex;
      margin-left: 0.4rem;
      flex-direction: column;

      .name {
        font-weight: bold;
      }
    }

    &:hover {
      box-shadow: 0 0 10px rgba(45, 52, 54, 1.0);
    }
  }
`

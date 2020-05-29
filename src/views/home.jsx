import React, { useState } from 'react'
import styled from 'styled-components'

import { StudentForm, StudentList } from '../components'

export const Home = styled(({ className }) => {
  const [updatedAt, setUpdatedAt] = useState(Date.now())

  return (
    <main className={className}>
      <StudentForm onStudentCreated={() => setUpdatedAt(Date.now())} />
      <StudentList key={updatedAt} />
    </main>
  )
})`

`

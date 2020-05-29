import React, { useState } from 'react'
import styled from 'styled-components'

import { StudentForm, StudentList } from '../components'

const Home = ({ className }) => {
  const [updatedAt, setUpdatedAt] = useState(Date.now())

  return (
    <main className={className}>
      <StudentList
        className="student-list"
        key={updatedAt}
      />
      <div
        className="student-form"
      >
        <StudentForm
          onStudentCreated={() => setUpdatedAt(Date.now())}
        />
      </div>
    </main>
  )
}

export default styled(Home)`
  display: grid;
  height: 100vh;
  grid-gap: 0.4rem;
  grid-template-areas: "list form";
  grid-template-columns: auto minmax(300px, 25%);
  background: #D3CCE3;
  background: linear-gradient(to right, #E9E4F0, #D3CCE3);

  @media screen and (max-width: 700px) {
    grid-template-areas:
      "form"
      "list";
    grid-template-rows: auto 1fr;
    grid-template-columns: auto;
  }

  .student-list {
    grid-area: list;
  }
  .student-form {
    grid-area: form;
    display: flex;
    padding: 0.8rem;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: center;
  }
`

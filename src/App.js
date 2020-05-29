import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { StudentForm, StudentList } from './components'

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

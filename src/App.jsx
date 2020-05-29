import React from 'react'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { Home } from './views'

const App = ({ className }) => {
  return (
    <div className={className}>
      <Home />
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
    </div>
  )
}

export default styled(App)`
  .App {
    font-family: sans-serif;
    text-align: center;
  }
`

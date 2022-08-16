import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from '../routes/routes'
import NavBar from './NavBar'

const Root = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <MainRouter />
      </BrowserRouter>
    </>
  )
}

export default Root

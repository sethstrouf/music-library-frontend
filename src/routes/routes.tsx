import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import User from '../pages/User'
import Users from '../pages/Users'
import NotFound from '../pages/NotFound'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/users" element={<Users />} >
        <Route path="/users/:id" element={<User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default MainRouter

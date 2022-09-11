import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import User from '../components/User'
import Users from '../pages/Users'
import NotFound from '../pages/NotFound'
import Demo from '../pages/Demo'
import Features from '../pages/Features'
import Pricing from '../pages/Pricing'
import SignInForm from '../components/SignInForm'
import SubscribeForm from '../components/SubscribeForm'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SubscribeForm />} />
      <Route path="/users" element={<Users />} >
        <Route path="/users/:id" element={<User />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default MainRouter

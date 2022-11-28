import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Demo from '../pages/Demo'
import Features from '../pages/Features'
import Pricing from '../pages/Pricing'
import SignInForm from '../components/SignInForm'
import SubscribeForm from '../components/SubscribeForm'
import MyProfile from '../pages/MyProfile'
import MyLibrary from '../pages/MyLibrary'
import RequireAuth from '../components/RequireAuth'
import RequireUnAuth from '../components/RequireUnAuth'
import useStore from '../store'
import axios from 'axios'

const MainRouter = () => {

  const setCurrentUser = useStore(state => state.setCurrentUser)
  const setAccessToken = useStore(state => state.setAccessToken)

  const navigate = useNavigate()
  const location: any = useLocation()
  const from = location.pathname || '/mylibrary'

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      signInUser()
    }
  }, [])

  const signInUser = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/api/login`,
        headers: { Authorization: `${localStorage.getItem('accessToken')}` },
        withCredentials: true
      })
      setCurrentUser(res.data.data)
      setAccessToken(res.headers.authorization)
      if (from === '/') {
        navigate('mylibrary', { replace: true })
      } else {
        navigate(from, { replace: true })
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />

      {/* only access if unauthorized */}
      <Route element={<RequireUnAuth />}>
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SubscribeForm />} />
      </Route>

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/mylibrary" element={<MyLibrary />} />
      </Route>

      {/* catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default MainRouter

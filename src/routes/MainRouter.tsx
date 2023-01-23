import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Features from '../pages/Features'
import Pricing from '../pages/Pricing'
import SignInForm from '../components/SignInForm'
import SubscribeForm from '../components/SubscribeForm'
import MyProfile from '../pages/MyProfile'
import MyLibrary from '../pages/MyLibrary'
import RequireAuth from '../components/RequireAuth'
import RequireUnAuth from '../components/RequireUnAuth'
import PersistLogin from '../components/PersistLogin'
import SearchWorks from '../pages/SearchWorks'
import MyColleagues from '../pages/MyColleagues'
import ResetPassword from '../pages/ResetPassword'

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* only access if unauthorized */}
        <Route element={<RequireUnAuth />}>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SubscribeForm />} />
        </Route>

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/mylibrary" element={<MyLibrary />} />
          <Route path="/mycolleagues" element={<MyColleagues />} />
          <Route path="/searchworks" element={<SearchWorks />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default MainRouter

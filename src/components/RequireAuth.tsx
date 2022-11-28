import { Navigate, Outlet, useLocation } from "react-router-dom"
import useStore from "../store"

const RequireAuth = () => {

  const currentUser = useStore(state => state.currentUser)
  const location = useLocation()

  return (
    currentUser
      ? <Outlet />
      : <Navigate to='/signin' state={{ from: location }} replace />
  )
}

export default RequireAuth

import { Navigate, Outlet, useLocation } from "react-router-dom"
import useStore from "../store"

const RequireAuth = () => {

  const authUser = useStore(state => state.authUser)
  const location = useLocation()

  return (
    authUser
      ? <Outlet />
      : <Navigate to='/signin' state={{ from: location }} replace />
  )
}

export default RequireAuth

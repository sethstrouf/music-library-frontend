import { Navigate, Outlet, useLocation } from "react-router-dom"
import useStore from "../store"

const RequireUnAuth = () => {

  const authUser = useStore(state => state.authUser)
  const location = useLocation()

  return (
    !authUser
      ? <Outlet />
      : <Navigate to='/mylibrary' state={{ from: location }} replace />
  )
}

export default RequireUnAuth

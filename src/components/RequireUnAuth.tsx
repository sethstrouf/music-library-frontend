import { Navigate, Outlet, useLocation } from "react-router-dom"
import useStore from "../store"

const RequireUnAuth = () => {

  const currentUser = useStore(state => state.currentUser)
  const location = useLocation()

  return (
    !currentUser
      ? <Outlet />
      : <Navigate to='/mylibrary' state={{ from: location }} replace />
  )
}

export default RequireUnAuth

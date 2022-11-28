import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from '../store'
import axios from "axios";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const setCurrentUser = useStore(state => state.setCurrentUser)
  const setAccessToken = useStore(state => state.setAccessToken)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      signInUser()
    } else {
      setIsLoading(false)
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
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

    return (
      <>
        {isLoading
          ? <i className="animate-spin fa-solid fa-spinner text-2xl"></i>
          : <Outlet />
        }
      </>
    )
}

export default PersistLogin

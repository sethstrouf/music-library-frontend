import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useStore from '../store'
import axios from "axios";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const setCurrentUser = useStore(state => state.setCurrentUser)
  const setAccessToken = useStore(state => state.setAccessToken)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)

  useEffect(() => {
    if (localStorage.getItem('accessToken') || localStorage.getItem('currentLibraryId')) {
      if (localStorage.getItem('accessToken')) {
        signInUser()
      }
      if (localStorage.getItem('currentLibraryId')) {
        fetchAndSetCurrentLibrary()
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const signInUser = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/api/login`,
        headers: { Authorization: `${localStorage.getItem('accessToken')}` }
      })
      setCurrentUser(res.data.data)
      setAccessToken(res.headers.authorization)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAndSetCurrentLibrary = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/libraries/${localStorage.getItem('currentLibraryId')}`,
        headers: { Authorization: `${localStorage.getItem('accessToken')}` }
      })
      setCurrentLibrary(res.data)
    } catch (error) {
      console.error(error)
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

import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { IUser } from "../common/types"
import { alertService } from "../services/alert"
import useStore from '../store'

const NavBarSignedIn = () => {

  const setCurrentUser = useStore(state => state.setCurrentUser)
  const setAccessToken = useStore(state => state.setAccessToken)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)
  const accessToken = useStore(state => state.accessToken)
  const [userFromApi, setUserFromApi] = useState<IUser | null>(null)

  useEffect(() => {
    fetchCurrentUser()
  }, [accessToken])

  const fetchCurrentUser = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/current_user`,
        headers: { Authorization: `${accessToken}` }
      })
      setUserFromApi(res.data);
    } catch (error) {
      setUserFromApi(null)
      console.error(error)
    }
  }

  const signOutUser = async () => {
    try {
      await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_API_HOST}/api/logout`,
        headers: { Authorization: `${accessToken}` },
        withCredentials: true
      })
      localStorage.clear()
      setCurrentUser(null)
      setAccessToken(null)
      setCurrentLibrary(null)
      setLibraryWorks(null)
    } catch (error) {
      alertService.showError('Could not sign out...')
      console.error(error)
    }
  }

  const navigation = [
    { name: 'Home', to: '/'},
    { name: 'Features', to: '/features' },
    { name: 'Demo', to: '/demo' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'My Library', to: '/mylibrary' },
    { name: 'Add to Library', to: '/searchworks' },
  ]

  return (
    <header className="pb-12 text-gray-500">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-sky-500 lg:border-none">
          <div className="flex items-center">
            <NavLink className='h-10 w-auto' to='/'>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=blue&shade=600"
                alt="Logo"
              />
            </NavLink>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <NavLink key={uuidv4()} to={link.to} className="text-base font-medium hover:text-gray-800">{link.name}</NavLink>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 group">
            <NavLink key={uuidv4()} to={'/myprofile'}>
              <span className="p-3 mr-6 text-pink-500 font-bold border border-pink-600 rounded-full bg-pink-100 group-hover:bg-pink-200">{userFromApi !== null && userFromApi.first_name[0] + userFromApi.last_name[0]}</span>
              <span className="absolute -translate-x-20 translate-y-10 text-sm group-hover:text-gray-800">My Profile</span>
            </NavLink>
            <button
              className="inline-block py-1.5 px-4 border border-transparent rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600"
              onClick={signOutUser}>
                Sign Out
            </button>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a key={uuidv4()} href={link.to} className="text-base font-medium hover:text-gray-800">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default NavBarSignedIn

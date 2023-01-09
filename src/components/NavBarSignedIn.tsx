import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { alertService } from "../services/alert"
import useStore from '../store'

const NavBarSignedIn = () => {

  const currentUser = useStore(state => state.currentUser)
  const setCurrentUser = useStore(state => state.setCurrentUser)
  const getAndSetCurrentUser = useStore(state => state.getAndSetCurrentUser)
  const setAccessToken = useStore(state => state.setAccessToken)
  const setCurrentLibrary = useStore(state => state.setCurrentLibrary)
  const setLibraryWorks = useStore(state => state.setLibraryWorks)
  const accessToken = useStore(state => state.accessToken)

  useEffect(() => {
    getAndSetCurrentUser()
  }, [accessToken])

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
          <div className="flex content-center ml-10 space-x-4 group">
            <div className="mr-6">
              <NavLink key={uuidv4()} to={'/myprofile'} >
                <div className="w-18 h-18 text-center">
                  {currentUser?.profile_photo_url
                  ?
                    <img className="inline -mt-2 -mb-2 h-12 w-12 font-bold border border-gray-700 rounded-full" src={currentUser!.profile_photo_url} alt="" />
                  :
                    <span className="p-3 text-gray-600 font-bold border border-gray-700 rounded-full bg-gray-200 group-hover:bg-gray-300">{currentUser !== null && currentUser.first_name[0] + currentUser.last_name[0]}</span>
                  }
                </div>
                <div className="mt-2 w-full text-center">
                  <span className="text-sm group-hover:text-gray-800">My Profile</span>
                </div>
              </NavLink>
            </div>
            <button
              className="inline-block px-4 h-10 border border-transparent rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600"
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

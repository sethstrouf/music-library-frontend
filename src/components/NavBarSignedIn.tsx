import axios from "axios"
import { NavLink } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { alertService } from "../services/alert"
import useStore from '../store'

const NavBarSignedIn = () => {

  const setAuthUser = useStore(state => state.setAuthUser)
  const setAuthToken = useStore(state => state.setAuthToken)
  const authToken = useStore(state => state.authToken)

  const signOutUser = async () => {
    try {
      await axios({
        method: 'delete',
        url: `${process.env.REACT_APP_API_HOST}/api/logout`,
        headers: { Authorization: `${authToken}` },
        withCredentials: true
      })
      localStorage.clear()
      setAuthUser(null)
      setAuthToken(null)
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
    { name: 'User Profile', to: '/myprofile' },
  ]

  return (
    <header className="text-gray-500">
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
          <div className="ml-10 space-x-4">
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

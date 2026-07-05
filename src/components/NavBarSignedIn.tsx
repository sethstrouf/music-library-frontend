import axios from 'axios'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinkClasses } from '../common/navLinkClasses'
import { alertService } from '../services/alert'
import useStore from '../store'
import logo from '../images/songsemble_logo.png'

const NAV_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'Features', to: '/features' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'My Library', to: '/mylibrary' },
  { name: 'Colleagues', to: '/mycolleagues' },
  { name: 'Add Music', to: '/searchworks' },
]

const NavBarSignedIn = () => {
  const currentUser = useStore((state) => state.currentUser)
  const setCurrentUser = useStore((state) => state.setCurrentUser)
  const getAndSetCurrentUser = useStore((state) => state.getAndSetCurrentUser)
  const setAccessToken = useStore((state) => state.setAccessToken)
  const setCurrentLibrary = useStore((state) => state.setCurrentLibrary)
  const setLibraryWorks = useStore((state) => state.setLibraryWorks)
  const accessToken = useStore((state) => state.accessToken)

  useEffect(() => {
    getAndSetCurrentUser()
  }, [accessToken])

  const signOutUser = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_HOST}/api/logout`, {
        headers: { Authorization: `${accessToken}` },
        withCredentials: true,
      })
      localStorage.clear()
      setCurrentUser(null)
      setAccessToken(null)
      setCurrentLibrary(null)
      setLibraryWorks(null)
    } catch (error) {
      alertService.showError('Unable to sign out. Please try again.')
      console.error(error)
    }
  }

  const initials =
    currentUser !== null ? `${currentUser.first_name[0]}${currentUser.last_name[0]}` : ''

  return (
    <header className="nav-shell">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex-shrink-0">
              <img className="h-10 w-auto" src={logo} alt="Songsemble" />
            </NavLink>
            <div className="hidden items-center gap-1 xl:flex">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.name} to={link.to} className={navLinkClasses}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NavLink to="/myprofile" className="group flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-slate-100">
              {currentUser?.profile_photo_url ? (
                <img
                  className="h-9 w-9 rounded-full border-2 border-slate-200 object-cover ring-2 ring-transparent group-hover:ring-brand-200"
                  src={currentUser.profile_photo_url}
                  alt=""
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                  {initials}
                </span>
              )}
              <span className="hidden text-sm font-medium text-slate-600 group-hover:text-slate-900 sm:inline">
                Profile
              </span>
            </NavLink>
            <button className="btn-danger" onClick={signOutUser}>
              Sign out
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 pb-4 xl:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.name} to={link.to} className={navLinkClasses}>
              {link.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default NavBarSignedIn

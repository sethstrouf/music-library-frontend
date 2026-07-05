import { NavLink } from 'react-router-dom'
import { navLinkClasses } from '../common/navLinkClasses'
import logo from '../images/songsemble_logo.png'

const NAV_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'Features', to: '/features' },
  { name: 'Pricing', to: '/pricing' },
]

const NavBarSignedOut = () => {
  return (
    <header className="nav-shell">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex-shrink-0">
              <img className="h-10 w-auto" src={logo} alt="Songsemble" />
            </NavLink>
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.name} to={link.to} className={navLinkClasses}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NavLink to="/signin" className="btn-ghost">
              Sign in
            </NavLink>
            <NavLink to="/signup" className="btn-primary">
              Sign up
            </NavLink>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 pb-4 lg:hidden">
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

export default NavBarSignedOut

import { NavLink } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import logo from '../images/songsemble_logo.png'

const NavBarSignedOut = () => {
  const navigation = [
    { name: 'Home', to: '/'},
    { name: 'Features', to: '/features' },
    { name: 'Pricing', to: '/pricing' },
  ]

  return (
    <header className="pb-12 text-gray-500">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-sky-500 lg:border-none">
          <div className="flex items-center">
            <NavLink className='h-10 w-auto' to='/'>
              <img
                className="h-12 w-auto"
                src={logo}
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
            <NavLink className="inline-block mr-4 text-base font-medium hover:text-gray-800" to='/signin'>Sign in</NavLink>
            <NavLink className="inline-block py-1.5 px-4 border border-transparent rounded-md text-base font-medium bg-sky-500 text-white hover:bg-sky-600" to='/signup'>Sign up</NavLink>
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

export default NavBarSignedOut

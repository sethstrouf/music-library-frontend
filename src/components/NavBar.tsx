import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <nav className='pb-6'>
        <ul>
          <li className='inline-block px-2 border-r border-purple-900 hover:underline'><NavLink to='/'>Home</NavLink></li>
          <li className='inline-block px-2 border-r border-purple-900 hover:underline'><NavLink to='/about'>About</NavLink></li>
          <li className='inline-block px-2 hover:underline'><NavLink end to='/users'>Users</NavLink></li>
        </ul>
      </nav>
    </>
  )
}

export default NavBar

import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <ul>
        <li className='inline-block px-2 border-r border-sky-900 hover:underline'><NavLink to='/'>Home</NavLink></li>
        <li className='inline-block px-2 border-r border-sky-900 hover:underline'><NavLink to='/about'>About</NavLink></li>
        <li className='inline-block px-2 hover:underline'><NavLink end to='/users'>Users</NavLink></li>
      </ul>
    </>
  )
}

export default NavBar

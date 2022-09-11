import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import UserTable from '../components/UserTable'

const Users = () => {

  useEffect(() => {
    document.title = 'Users'
  }, [])

  return (
    <main className='max-w-7xl mx-auto'>
      <h1 className='text-center pb-12'>Users</h1>
      <UserTable />
      <Outlet />
    </main>
  )
}

export default Users

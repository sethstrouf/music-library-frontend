import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import UserTable from '../components/UserTable'
import SubscribeForm from '../components/SubscribeForm'

const Users = () => {

  useEffect(() => {
    document.title = 'Users'
  }, [])

  return (
    <main className='max-w-7xl mx-auto'>
      <h1 className='text-center'>Users</h1>
      <SubscribeForm />
      <br />
      <UserTable />
      <Outlet />
    </main>
  )
}

export default Users

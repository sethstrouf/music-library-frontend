import React from 'react'
import { Outlet } from 'react-router-dom'
import UserTable from '../components/UserTable'

const Users = () => {
  return (
    <main>
      <h1>Users Page</h1>
      <UserTable />
      <Outlet />
    </main>
  )
}

export default Users

import React, { useEffect, useState } from 'react'
import useStore from '../store'

const UserTable = () => {

  const getUsers = useStore(state => state.getUsers)
  const tempUsers = useStore(state => state.users)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUsers()
    setIsLoading(false)
  }, [])

  return (
    <div className='pb-6'>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody className='striped'>
        {isLoading ? (
          <tr><td>Loading...</td></tr>
        ) : (
          <>
            {tempUsers.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              )
            })}
            {!tempUsers.length && (
              <tr><td>Loading...</td></tr>
              )}
          </>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable

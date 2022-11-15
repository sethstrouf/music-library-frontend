import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useStore from '../store'
import { v4 as uuidv4 } from 'uuid'

const UserTable = () => {

  // const getUsers = useStore(state => state.getUsers)
  const destroyUser = useStore(state => state.destroyUser)
  const users = useStore(state => state.users)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (users.length === 0) {
      // getUsers()
    }
    setIsLoading(false)
  }, [users.length])

  return (
    <div className='pb-6'>
      <table>
        <thead>
          <tr>
            <th className='w-16'>No</th>
            <th className='w-32'>Name</th>
            <th className='w-56'>Email</th>
            <th>Display</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className='striped'>
        {isLoading ? (
          <tr><td>Loading...</td></tr>
        ) : (
          <>
            {users.map(user => {
              return (
                <tr key={uuidv4()}>
                  <td className='text-center'>{user.id}</td>
                  <td>{user.attributes.name}</td>
                  <td>{user.attributes.email}</td>
                  <td className='px-8'><NavLink className={'hover:underline'} to={`/users/${user.id}`}>Display User</NavLink></td>
                  <td><button className={'hover:underline'} onClick={()=> {destroyUser(Number(user.id))}}>Delete User</button></td>
                </tr>
              )
            })}
            {!users.length && (
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

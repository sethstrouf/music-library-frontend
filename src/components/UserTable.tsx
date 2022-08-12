import React, { useEffect, useState } from 'react'
import { alertService } from '../services/alert'
import Axios from 'axios'

const UserTable = () => {

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_HOST}/users`).then(res => {
      setUsers(res.data)
    }).catch(e => {
      alertService.showError('Cannot get user data...')
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? (
            <tr><td>Loading...</td></tr>
          ) : (
            <>
              {users.map((user: {id: number, name: string, email: string}) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
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
        <hr></hr>
      </div>
    </div>
  )
}

export default UserTable
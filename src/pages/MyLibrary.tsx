import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useStore from '../store'
import { IUser } from '../common/types'

const MyLibrary = () => {

  const authToken = useStore(state => state.authToken)

  const [users, setUsers] = useState<IUser[]>()

  useEffect(() => {
    document.title = 'My Library'
  }, [])

  const getUsers = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_HOST}/api/v1/users`,
        headers: { Authorization: `${authToken}` }
      })
      console.log('Users: ', res.data.data)
      setUsers(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line
  }, [authToken])

  return (
    <>
      <article>
        <h1 className='text-center'>My Library</h1>
        <br />
        {users?.length
          ? (
              <ul>
                {users.map((user, i) => <li key={i}>{user?.attributes?.email}</li>)}
              </ul>
          ) : <p>No users to display</p>
        }
      </article>
    </>
  )
}

export default MyLibrary

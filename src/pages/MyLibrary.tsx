import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IUser } from '../common/types'

const MyLibrary = () => {

  const [users, setUsers] = useState<IUser[]>()

  useEffect(() => {
    document.title = 'My Library'
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/v1/users`, { signal: controller.signal })
        console.log(response.data.data)
        isMounted && setUsers(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <>
      <article>
        <h1 className='text-center'>My Library</h1>
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

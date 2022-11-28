import axios from 'axios'
import { useEffect } from 'react'
import useStore from '../store'
import { IUser } from '../common/types'

const MyLibrary = () => {

  const accessToken = useStore(state => state.accessToken)
  const users = useStore(state => state.users)
  const setUsers = useStore(state => state.setUsers)

  useEffect(() => {
    document.title = 'My Library'
  }, [])

  const getUsers = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_HOST}/api/v1/users`,
        headers: { Authorization: `${accessToken}` }
      })
      setUsers(res.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!users?.length) {
      getUsers()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <article>
        <h1 className='text-center'>My Library</h1>
        <br />
        {users?.length
          ? (
              <ul>
                {users.map((user, i) => <li key={i}>{user['attributes']['email']}</li>)}
              </ul>
          ) : <p>No users to display</p>
        }
      </article>
    </>
  )
}

export default MyLibrary

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
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl sm:leading-none lg:text-6xl">My Library</h2>
    </div>
  )
}

export default MyLibrary

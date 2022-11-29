import { useEffect } from 'react'
import useStore from '../store'

const MyProfile = () => {
  const currentUser = useStore(state => state.currentUser)

  useEffect(() => {
    document.title = 'User Profile'
  }, [])

  return (
    <>
      <h1 className='text-center'>User Profile</h1>
      <br />
      {currentUser?.name}
      <br />
      {currentUser?.email}
    </>
  )
}

export default MyProfile

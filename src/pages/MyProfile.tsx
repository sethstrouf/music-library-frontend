import React, { useEffect } from 'react'

const MyProfile = () => {

  useEffect(() => {
    document.title = 'User Profile'
  }, [])

  return (
    <>
      <h1 className='text-center'>User Profile</h1>
    </>
  )
}

export default MyProfile

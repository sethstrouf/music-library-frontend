import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../store'

const User = () => {

  const { id } = useParams()
  const getUser = useStore(state => state.getUser)
  const user = useStore(state => state.user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user?.id !== Number(id)) {
      getUser(Number(id))
    }
    setIsLoading(false)
  }, [getUser, id, user?.id])

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
          ) : (
            <>
              {user && (
                <div className='ml-3 p-2 w-80 border border-red-900'>
                  <h1>{user?.name}</h1>
                  <p>Email: {user?.email}!</p>
                </div>
              )}
            </>
      )}
    </>
  )
}

export default User

import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../store'

const User = () => {

  const { id } = useParams()
  const getUser = useStore(state => state.getUser)
  const updateUser = useStore(state => state.updateUser)
  const user = useStore(state => state.user)
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user?.id !== Number(id)) {
      getUser(Number(id))
    }
    if (user) {
      setEmail(user.email)
      setIsLoading(false)
    }
  }, [getUser, id, user?.id])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      user.email = email
      updateUser(user)
    }

  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
          ) : (
            <>
              {user && (
                <div className='ml-3 p-2 w-96 border border-red-900 text-center'>
                  <h1>{user.name}</h1>
                  <form onSubmit={handleSubmit}>
                    <label className='font-bold'>Edit Email</label>
                    <br />
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} className='text-center border border-purple-900 bg-purple-100 p-1'></input>
                  </form>

                </div>
              )}
            </>
      )}
    </>
  )
}

export default User

import React, { FormEvent, useState } from 'react'
import useStore from '../store'
import { alertService } from '../services/alert'

const SubscribeForm = () => {

  const createUser = useStore(state => state.createUser)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSendingRequest, setIsSendingRequest] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const attributes = {name: name, email: email }
    e.preventDefault()
    setIsSendingRequest(true)
    validateForm()
    createUser({attributes})
    setIsSendingRequest(false)
    clearForm()
  }

  const validateForm = () => {
    if (!name) {
      setIsSendingRequest(false)
      return alertService.showError('Please input name!')
    }
    if (!email) {
      setIsSendingRequest(false)
      return alertService.showError('Please input email!')
    }
  }

  const clearForm = () => {
    setName('')
    setEmail('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            className='ml-2 mb-1 bg-sky-50 border border-sky-500'
            type="text"
            placeholder="Please input your name"
            value={name}
            onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Email </label>
          <input
            className='ml-2 bg-sky-50 border border-sky-500'
            type="text"
            placeholder="Please input your email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='pt-2'>
          {isSendingRequest ? (
            <button type="submit" disabled>Sending Request...</button>
          ) : (
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Subscribe
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SubscribeForm

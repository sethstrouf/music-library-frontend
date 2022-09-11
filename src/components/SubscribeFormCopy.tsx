import React, { FormEvent, useState } from 'react'
import { alertService } from '../services/alert'

const SubscribeForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSendingRequest, setIsSendingRequest] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // const attributes = {name: name, email: email, password: password, password_confirmation: password }
    const userAttributes = {email: email, password: password }
    e.preventDefault()
    setIsSendingRequest(true)
    if(validateForm()) {
      setIsSendingRequest(false)
      clearForm()
    }
  }

  const validateForm = () => {
    if (!email) {
      setIsSendingRequest(false)
      alertService.showError('Please input your email')
      return false
    }
    if (!password) {
      setIsSendingRequest(false)
      alertService.showError('Please input a valid password')
      return false
    }
    return true
  }

  const clearForm = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <div>
      <h1 className='pb-4 text-center font-bold text-lg'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            className='ml-2 bg-sky-50 border border-sky-500'
            type="text"
            placeholder="Please input your email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input
            className='ml-2 bg-sky-50 border border-sky-500'
            type="password"
            placeholder="Please input your email"
            value={password}
            onChange={e => setPassword(e.target.value)} />
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

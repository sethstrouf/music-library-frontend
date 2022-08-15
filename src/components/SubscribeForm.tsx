import React, { FormEvent, useState } from 'react'
import useStore from '../store'
import { alertService } from '../services/alert'

const SubscribeForm = () => {

  const postUser = useStore(state => state.postUser)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSendingRequest, setIsSendingRequest] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSendingRequest(true)
    validateForm()
    postUser({name, email})
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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Please input your name"
              value={name}
              onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label>Email </label>
            <input
              type="text"
              placeholder="Please input your email"
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <hr />
          <div>
            {isSendingRequest ? (
              <button type="submit" disabled>Sending Request...</button>
            ) : (
              <button type="submit">Subscribe</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubscribeForm

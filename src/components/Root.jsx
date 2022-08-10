import React, { useEffect, useState } from "react"
import Axios from "axios"
import { alertService } from '../services/alert'
import SubscribeForm from "./SubscribeForm"
import UserTable from "./UserTable"

const Root = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSendingRequest, setIsSendingRequest] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const changeName = (e) => {
    setName(e.target.value)
  }

  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const subscribe = () => {
    setIsSendingRequest(true)
    if (!name) {
      setIsSendingRequest(false)
      return alertService.showError('Please input name!')
    }
    if (!email) {
      setIsSendingRequest(false)
      return alertService.showError('Please input email!')
    }
    Axios.post(`${process.env.REACT_APP_API_HOST}/users`, {
      name: name,
      email: email,
    }).then(res => {
      if (res.data && res.data.id) {
        alertService.showSuccess(`Welcome, ${res.data.name}!`)
        setIsSubscribed(true)
      } else {
        alertService.showError('Subscription failed!')
      }
    }).finally(() => {
      setIsSendingRequest(false)
    })
  }

  return (
    <div className="container">
        <>
          <UserTable
            subscription={isSubscribed}
          />
          <SubscribeForm
            name={name}
            email={email}
            changeName={changeName}
            changeEmail={changeEmail}
            subscribe={subscribe}
            sendingRequest={isSendingRequest}
          />
        </>
    </div>
  )
}

export default Root

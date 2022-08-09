import React from "react"
import Axios from "axios"
import { alertService } from '../services/alert'
import SubscribeForm from "./SubscribeForm"
import UserTable from "./UserTable"
import { API_HOST } from "../config"

class Root extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      sendingRequest: false,
      subscription: false,
    }
    this.changeName = this.changeName.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  changeName(e) {
    let name = e.target.value
    this.setState({name})
  }

  changeEmail(e) {
    let email = e.target.value
    this.setState({email})
  }

  subscribe() {
    this.setState({
      sendingRequest: true
    })
    if (!this.state.name) {
      this.setState({
        sendingRequest: false
      })
      return alertService.showError('Please input name!')
    }
    if (!this.state.email) {
      this.setState({
        sendingRequest: false
      })
      return alertService.showError('Please input email!')
    }
    Axios.post(`${API_HOST}/users`, {
      name: this.state.name,
      email: this.state.email,
    }).then(res => {
      if (res.data) {
        this.setState({
          subscription: true
        })
      } else {
        alertService.showError('Subscription failed!')
      }
    }).finally(() => {
      this.setState({
        sendingRequest: false
      })
    })
  }

  render() {
    return (
      <div className="container">
          <>
            <UserTable
              subscription={this.state.subscription}
            />
            <SubscribeForm
            name={this.state.name}
            email={this.state.email}
            changeName={this.changeName}
            changeEmail={this.changeEmail}
            subscribe={this.subscribe}
            sendingRequest={this.state.sendingRequest}
            />
          </>
      </div>
    )
  }
}

export default Root

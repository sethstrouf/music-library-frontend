import React from "react"
import { alertService } from '../services/alert'
import Axios from "axios"
import { API_HOST } from "../config"
class UserTable extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      loading: true,
      users: []
    }
  }

  componentDidMount() {
    Axios.get(`${API_HOST}/users`).then(res => {
      this.setState({
        users: res.data
      })
    }).catch(e => {
      alertService.showError('Cannot get user data...')
    }).finally(() => {
      this.setState({
        loading: false
      })
    })
  }

  render() {
    return (
      <div className="row mt-5 justify-content-center">
        <div className="col-12 col-lg-8">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
            {this.state.loading ? (
              <tr><td>Loading...</td></tr>
            ) : (
              <>
                {this.state.users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <thd>{index+1}</thd>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  )
                })}
                {!this.state.users.length && (
                  <tr><td>Loading...</td></tr>
                  )}
              </>
            )}
            </tbody>
          </table>
          <hr></hr>
        </div>
      </div>
    )
  }
}

export default UserTable

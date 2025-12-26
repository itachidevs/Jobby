import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    // console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onChangingUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangingPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmtting = async event => {
    event.preventDefault()
    const {username, password} = this.state
    // console.log(username, password)
    const userDeatails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDeatails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      // console.log(data.jwt_token)
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    console.log(username, password)
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.onSubmtting}>
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-website-logo"
          />
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={this.onChangingUsername}
              id="username"
              className="username"
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={this.onChangingPassword}
              className="password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="errormsg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login

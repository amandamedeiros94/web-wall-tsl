import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import ReactLoading from 'react-loading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { STATUS } from '../../config'
import validate from '../../validate'
import './index.css'

const LoginForm = (props) => {
  return (
    <div className="sign__container">
      <input
        type="text"
        className="sign__input"
        name="username"
        placeholder="Username"
        onChange={props.updateUserNameValue}
      />
      <input
        type="password"
        className="sign__input"
        name="password"
        placeholder="Password"
        onChange={props.updatePasswordValue}
      />
      <button className="sign__button" onClick={props.handleSignIn}>
        Sign in
      </button>
      <span className="sign__text">or</span>
      <a className="sign__link" onClick={props.showCreateAccount}>
        Create account
      </a>
    </div>
  )
}

const CreateAccountForm = (props) => {
  return (
    <div className="sign__container">
      <input
        className="sign__input"
        type="text"
        name="username"
        placeholder="Username"
        onChange={props.updateNewUserValue}
      />
      <input
        className="sign__input"
        type="email"
        placeholder="Email"
        name="email"
        onChange={props.updateNewEmailValue}
      />
      <input
        className="sign__input"
        type="password"
        name="password"
        placeholder="Password"
        onChange={props.updateNewPasswordValue}
      />
      <button className="sign__button" onClick={props.handleCreateAccount}>
        Create
      </button>
      <a className="sign__link sign__link--cancel" onClick={props.handleLogin}>
        Cancel
      </a>
    </div>
  )
}

const LoggedUser = (props) => {
  return (
    <div className="sign__message-container">
      <span className="sign__message">
        Hello, <strong>{props.user.username}</strong>!
      </span>
      <a className="sign__link" onClick={props.handleSignOut}>
        Sign out
      </a>
    </div>
  )
}

const Sign = inject('stores')(
  observer(
    class Sign extends Component {
      signStore = this.props.stores.signStore
      validate = validate

      /* Handle functions for loging in user */
      updateUserNameValue = (event) => {
        this.signStore.updateUserNameValue(event.target.value)
      }

      updatePasswordValue = (event) => {
        this.signStore.updatePasswordValue(event.target.value)
      }

      handleSignIn = () => {
        if (
          this.validate.isEmpty(this.signStore.userLogin.username) ||
          this.validate.isEmpty(this.signStore.userLogin.password)
        ) {
          toast.warn('All fields are mandatory')
        } else {
          this.signStore.signIn()
        }
      }

      handleSignOut = () => {
        this.signStore.signOut()
      }

      /* Handle functions for creating user */
      updateNewUserValue = (event) => {
        this.signStore.updateNewUserValue(event.target.value)
      }

      updateNewEmailValue = (event) => {
        this.signStore.updateNewEmailValue(event.target.value)
      }

      updateNewPasswordValue = (event) => {
        this.signStore.updateNewPasswordValue(event.target.value)
      }

      handleCreateAccount = () => {
        if (
          this.validate.isEmpty(this.signStore.newUser.username) ||
          this.validate.isEmpty(this.signStore.newUser.email) ||
          this.validate.isEmpty(this.signStore.newUser.password)
        ) {
          toast.warn('All fields are mandatory')
        } else if (!this.validate.isEmail(this.signStore.newUser.email)) {
          toast.warn('Invalid email')
        } else {
          this.signStore.createUserAccount()
        }
      }

      showCreateAccount = () => {
        this.signStore.showCreateAccount()
      }

      componentDidUpdate() {
        this.signStore.resetStatus()
      }

      render() {
        if (this.signStore.status === STATUS.ERROR && this.signStore.message) {
          toast.error(this.signStore.message)
        }

        return (
          <div className="sign">
            <ToastContainer />

            {this.signStore.status === STATUS.LOADING && (
              <div className="loading">
                <ReactLoading
                  className="loading__loader"
                  type="bars"
                  color="#28a2d1"
                  height={120}
                  width={120}
                />
              </div>
            )}

            {!this.signStore.createAccount ? (
              this.signStore.user.id ? (
                <LoggedUser
                  handleSignOut={this.handleSignOut}
                  user={this.signStore.user}
                />
              ) : (
                <LoginForm
                  updateUserNameValue={this.updateUserNameValue}
                  updatePasswordValue={this.updatePasswordValue}
                  handleSignIn={this.handleSignIn}
                  showCreateAccount={this.showCreateAccount}
                />
              )
            ) : (
              <CreateAccountForm
                updateNewUserValue={this.updateNewUserValue}
                updateNewEmailValue={this.updateNewEmailValue}
                updateNewPasswordValue={this.updateNewPasswordValue}
                handleCreateAccount={this.handleCreateAccount}
                handleLogin={this.showCreateAccount}
              />
            )}
          </div>
        )
      }
    }
  )
)

export default Sign

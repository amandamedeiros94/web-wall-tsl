import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import './index.css'

const LoginForm = (props) => {
  return (
    <div>
      <label>
        Login:
        <input
          type="text"
          name="username"
          onChange={props.updateUserNameValue}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          onChange={props.updatePasswordValue}
        />
      </label>
      <span className="input-post__submit-button" onClick={props.handleSignIn}>
        Sign in
      </span>
      <span onClick={props.showCreateAccount}>Create account</span>
    </div>
  )
}

const CreateAccountForm = (props) => {
  return (
    <div>
      <label>
        Username:
        <input
          type="text"
          name="username"
          onChange={props.updateNewUserValue}
        />
      </label>
      <label>
        Email:
        <input type="text" name="email" onChange={props.updateNewEmailValue} />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          onChange={props.updateNewPasswordValue}
        />
      </label>
      <span
        className="input-post__submit-button"
        onClick={props.handleCreateAccount}
      >
        Create
      </span>

      <span className="input-post__submit-button" onClick={props.handleLogin}>
        Login
      </span>
    </div>
  )
}

const LoggedUser = (props) => {
  return (
    <div>
      <span>Hello {props.user.username}! You're logged in</span>
      <span className="input-post__submit-button" onClick={props.handleSignOut}>
        Sign out
      </span>
    </div>
  )
}

const Sign = inject('stores')(
  observer(
    class Sign extends Component {
      signStore = this.props.stores.signStore

      /* Handle functions for loging in user */
      updateUserNameValue = (event) => {
        this.signStore.updateUserNameValue(event.target.value)
      }

      updatePasswordValue = (event) => {
        this.signStore.updatePasswordValue(event.target.value)
      }

      handleSignIn = () => {
        this.signStore.signIn()
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
        this.signStore.createUserAccount()
      }

      showCreateAccount = () => {
        this.signStore.showCreateAccount()
      }

      render() {
        return (
          <div className="sign">
            {this.signStore.message && <div>{this.signStore.message}</div>}
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

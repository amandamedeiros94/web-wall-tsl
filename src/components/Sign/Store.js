import axios from 'axios'
import { action, decorate, observable } from 'mobx'
import { Cookies } from 'react-cookie'
import { STATUS } from '../../config'

class SignStore {
  cookies = new Cookies()
  createAccount = false
  message
  status = STATUS.INITIAL
  userLogin = { username: '', password: '' }
  newUser = { username: '', email: '', password: '' }
  user = {
    id: this.cookies.get('userId'),
    username: this.cookies.get('userName'),
    email: this.cookies.get('userEmail'),
  }

  showCreateAccount() {
    this.createAccount = !this.createAccount
  }

  loginUser() {
    this.cookies.set('userId', this.user.id, { maxAge: 86400 })
    this.cookies.set('userName', this.user.username, { maxAge: 86400 })
    this.cookies.set('userEmail', this.user.email, { maxAge: 86400 })
  }

  signIn() {
    this.status = STATUS.LOADING
    axios
      .post(`${process.env.REACT_APP_API_URL}/obtain-auth-token/`, {
        username: this.userLogin.username,
        password: this.userLogin.password,
      })
      .then((res) => {
        if (res.data.token) {
          this.status = STATUS.LOADING
          axios
            .get(
              `${process.env.REACT_APP_API_URL}/users/validate-auth-token/`,
              {
                headers: { Authorization: `Token ${res.data.token}` },
              }
            )
            .then((res) => {
              this.user = res.data
              this.loginUser()
              this.status = STATUS.READY
            })
            .catch((error) => {
              this.message = 'Invalid username or password'
              this.status = STATUS.ERROR
            })
        }
      })
      .catch((error) => {
        this.message = 'Invalid username or password'
        this.status = STATUS.ERROR
      })
  }

  signOut() {
    this.status = STATUS.LOADING
    this.user = ''
    this.cookies.remove('userId')
    this.cookies.remove('userName')
    this.cookies.remove('userEmail')
    this.status = STATUS.READY
  }

  updateUserNameValue(userName) {
    this.userLogin.username = userName
  }

  updatePasswordValue(password) {
    this.userLogin.password = password
  }

  updateNewUserValue(userName) {
    this.newUser.username = userName
  }

  updateNewEmailValue(email) {
    this.newUser.email = email
  }

  updateNewPasswordValue(password) {
    this.newUser.password = password
  }

  createUserAccount() {
    this.status = STATUS.LOADING
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/`, {
        username: this.newUser.username,
        email: this.newUser.email,
        password: this.newUser.password,
      })
      .then((res) => {
        this.user = res.data
        this.loginUser()
        this.createAccount = false
        this.status = STATUS.READY
      })
      .catch((error) => {
        this.message = 'Username invalid or already exists'
        this.status = STATUS.ERROR
      })
  }

  resetStatus() {
    this.message = ''
  }
}

decorate(SignStore, {
  createAccount: observable,
  message: observable,
  signedIn: observable,
  status: observable,
  userLogin: observable,
  user: observable,
  newUser: observable,
  createUserAccount: action,
  showCreateAccount: action,
  signIn: action,
  signOut: action,
  updateUserNameValue: action,
  updatePasswordValue: action,
  updateNewUserValue: action,
  updateNewEmailValue: action,
  updateNewPasswordValue: action,
  resetStatus: action,
})

export default SignStore

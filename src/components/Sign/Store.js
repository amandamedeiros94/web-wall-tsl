import { action, decorate, observable } from 'mobx'
import { STATUS } from '../../config'

export default class SignStore {
  user
  signedIn = false
  status = STATUS.INITIAL

  signIn() {
    this.status = STATUS.LOADING
    this.signedIn = true
    this.status = STATUS.READY
  }

  signOut() {
    this.status = STATUS.LOADING
    this.signedIn = false
    this.status = STATUS.READY
  }
}

decorate(SignStore, {
  user: observable,
  signedIn: observable,
  status: observable,
  signIn: action,
  signOut: action,
})

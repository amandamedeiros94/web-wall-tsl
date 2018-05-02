import axios from 'axios'
import { action, decorate, observable } from 'mobx'
import { STATUS } from '../../config'

export default class PostsStore {
  status = STATUS.INITIAL
  inputText

  storeInputText(inputText) {
    this.inputText = inputText
  }

  postMessage() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/`, {
        message: this.inputText,
        date: '2018-05-02T20:07:38Z',
      })
      .then((res) => {
        //dar fetch de novo na loja
        this.status = STATUS.READY
      })
      .catch((error) => {
        this.status = STATUS.ERROR
      })
  }
}

decorate(PostsStore, {
  postMessage: action,
  storeInputText: action,
  inputText: observable,
})

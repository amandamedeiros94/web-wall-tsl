import axios from 'axios'
import { action, decorate, observable } from 'mobx'
import { STATUS } from '../../config'

export default class PostsStore {
  inputText = ''
  posts
  status = STATUS.INITIAL

  fetchPosts() {
    this.status = STATUS.LOADING

    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/`)
      .then((res) => {
        this.posts = res.data
        this.status = STATUS.READY
      })
      .catch((error) => {
        this.status = STATUS.ERROR
      })
  }

  postMessage() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/`, {
        message: this.inputText,
      })
      .then((res) => {
        this.fetchPosts()
        this.inputText = ''
      })
      .catch((error) => {
        this.status = STATUS.ERROR
      })
  }

  storeInputText(inputText) {
    this.inputText = inputText
  }
}

decorate(PostsStore, {
  inputText: observable,
  posts: observable,
  status: observable,
  fetchPosts: action,
  postMessage: action,
  storeInputText: action,
})

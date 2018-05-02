import axios from 'axios'
import { action, decorate, observable } from 'mobx'
import { STATUS } from '../../config'

export default class PostsStore {
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
}

decorate(PostsStore, {
  posts: observable,
  status: observable,
  fetchPosts: action,
})

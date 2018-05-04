import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { STATUS } from '../../config'
import validate from '../../validate'
import './InputPost.css'

const InputPost = inject('stores')(
  observer(
    class InputPost extends Component {
      postsStore = this.props.stores.postsStore
      signStore = this.props.stores.signStore
      validate = validate

      handleSubmit = () => {
        if (this.validate.isEmpty(this.postsStore.inputText)) {
          toast.warn("Don't be shy. Say something!")
        } else {
          this.postsStore.postMessage(this.signStore.user)
        }
      }

      updateInputValue = (event) => {
        this.postsStore.storeInputText(event.target.value)
      }

      render() {
        return (
          <div className="input-post">
            {this.postsStore.status === STATUS.LOADING && (
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

            <div className="container">
              <div className="input-post__container">
                <div className="posts__item-image-container">
                  <Gravatar
                    className="input-post__image"
                    email={this.signStore.user.email}
                    size={80}
                  />
                </div>
                <textarea
                  className="input-post__field"
                  name="post"
                  onChange={this.updateInputValue}
                  value={this.postsStore.inputText}
                />
              </div>
              <div className="input-post__button-wrapper">
                <button
                  className="input-post__button"
                  onClick={this.handleSubmit}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )
      }
    }
  )
)

export default InputPost

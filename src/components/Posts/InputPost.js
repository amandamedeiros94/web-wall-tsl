import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import './index.css'

const InputPost = inject('stores')(
  observer(
    class InputPost extends Component {
      postsStore = this.props.stores.postsStore
      signStore = this.props.stores.signStore

      handleSubmit = () => {
        this.postsStore.postMessage(this.signStore.user)
      }

      updateInputValue = (event) => {
        this.postsStore.storeInputText(event.target.value)
      }

      render() {
        return (
          <div className="input-post">
            <img
              alt=""
              className="input-post__img"
              src="https://picsum.photos/g/80/80"
            />
            <input
              className="input-post__field"
              name="post"
              onChange={this.updateInputValue}
              type="text"
            />
            <span
              className="input-post__submit-button"
              onClick={this.handleSubmit}
            >
              Send
            </span>
          </div>
        )
      }
    }
  )
)

export default InputPost

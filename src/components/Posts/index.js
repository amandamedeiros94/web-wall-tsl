import { inject, observer } from 'mobx-react'
import moment from 'moment'
import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import ReactPlaceholder from 'react-placeholder'
import { RectShape, TextBlock } from 'react-placeholder/lib/placeholders'
import { STATUS } from '../../config'
import './index.css'

const Placeholder = (
  <ul className="posts__list">
    {[1, 2, 3, 4].map((item, index) => {
      return (
        <li key={index} className="posts__item">
          <div className="posts__item-image-container">
            <RectShape color="#f0f0f0" style={{ width: 80, height: 80 }} />
          </div>
          <TextBlock className="post__item-text" rows={4} color="#f0f0f0" />
        </li>
      )
    })}
  </ul>
)

const Posts = inject('stores')(
  observer(
    class Posts extends Component {
      postsStore = this.props.stores.postsStore
      signStore = this.props.stores.signStore

      componentDidMount() {
        this.postsStore.fetchPosts()
      }

      render() {
        return (
          <main className="posts">
            <div className="container">
              <ReactPlaceholder
                customPlaceholder={Placeholder}
                ready={this.postsStore.status === STATUS.READY}
              >
                <ul className="posts__list">
                  {this.postsStore.posts &&
                    this.postsStore.posts.map((post) => {
                      return (
                        <li className="posts__item" key={post.id}>
                          <div className="posts__item-image-container">
                            <Gravatar
                              className="posts__item-image"
                              email={post.user.email}
                              size={80}
                            />
                          </div>
                          <div className="post__item-text">
                            {post.user && (
                              <h3 className="posts__item-title">
                                {post.user.username}
                              </h3>
                            )}
                            <div className="posts__item-date">
                              {moment(post.date).calendar()}
                            </div>
                            <p className="posts__item-message">
                              {post.message}
                            </p>
                          </div>
                        </li>
                      )
                    })}
                </ul>
              </ReactPlaceholder>
            </div>
          </main>
        )
      }
    }
  )
)

export default Posts

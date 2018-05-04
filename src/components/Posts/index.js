import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { STATUS } from '../../config'
import './index.css'

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
            {this.postsStore.status === STATUS.LOADING && <p>Loading...</p>}

            {this.postsStore.status === STATUS.ERROR && <p>Error message.</p>}

            {this.postsStore.status === STATUS.READY &&
              this.postsStore.posts && (
                <ul className="posts__list">
                  {this.postsStore.posts.map((post) => {
                    return (
                      <li className="posts__item" key={post.id}>
                        {post.user && <span>{post.user}: </span>}
                        <span>{post.message}</span>
                      </li>
                    )
                  })}
                </ul>
              )}
          </main>
        )
      }
    }
  )
)

export default Posts

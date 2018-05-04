import { Provider, observer } from 'mobx-react'
import React, { Component } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Posts from './components/Posts'
import InputPost from './components/Posts/InputPost'
import Sign from './components/Sign'
import stores from './stores'

const App = observer(
  class App extends Component {
    signStore = stores.signStore

    render() {
      return (
        <Provider stores={stores}>
          <div>
            <Header />
            <Sign />
            {this.signStore.user.id && <InputPost />}
            <Posts />
            <Footer />
          </div>
        </Provider>
      )
    }
  }
)

export default App

import { Provider } from 'mobx-react'
import React, { Component } from 'react'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import InputPost from './components/Posts/InputPost'
import Posts from './components/Posts'
import stores from './stores'

export default class App extends Component {
  render() {
    return (
      <Provider stores={stores}>
        <div>
          <Header />
          <InputPost />
          <Posts />
          <Footer />
        </div>
      </Provider>
    )
  }
}

import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import './index.css'

const Header = inject('stores')(
  observer(
    class Header extends Component {
      render() {
        return <footer className="header">Header</footer>
      }
    }
  )
)

export default Header

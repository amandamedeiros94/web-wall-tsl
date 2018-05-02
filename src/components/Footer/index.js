import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import './index.css'

const Footer = inject('stores')(
  observer(
    class Footer extends Component {
      render() {
        return <header className="footer">Footer</header>
      }
    }
  )
)

export default Footer

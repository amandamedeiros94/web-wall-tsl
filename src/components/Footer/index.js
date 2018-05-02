import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import './index.css'

const Footer = inject('stores')(
  observer(
    class Footer extends Component {
      render() {
        return <footer className="footer">Footer</footer>
      }
    }
  )
)

export default Footer

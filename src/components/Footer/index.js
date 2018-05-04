import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import './index.css'

const Footer = inject('stores')(
  observer(
    class Footer extends Component {
      render() {
        return (
          <footer className="footer">
            <div className="container">© 2018 by Amanda Medeiros</div>
          </footer>
        )
      }
    }
  )
)

export default Footer

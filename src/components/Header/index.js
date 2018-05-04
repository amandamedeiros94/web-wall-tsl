import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import logo from '../../assets/logos/tsl.svg'
import Sign from '../Sign'
import './index.css'

const Header = inject('stores')(
  observer(
    class Header extends Component {
      render() {
        return (
          <header className="header">
            <div className="container header__container">
              <div className="header__logo-container">
                <img className="header__logo" src={logo} alt="TSL Wall" />
                <h1 className="header__title">TSL Wall</h1>
              </div>
              <div className="header__sign-container">
                <Sign />
              </div>
            </div>
          </header>
        )
      }
    }
  )
)

export default Header

import React, { Component } from 'react'

import Link from 'next/link'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { removeAccessToken } from '../../utils/cookieUtils'

export default class Navigation extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool
  }

  logUserOut = () => {
    removeAccessToken()
    Router.push('/login')
  }

  render() {
    return (
      <span>
        <header className="sticky nav-bar shadowed">
          <label
            htmlFor="drawer-checkbox"
            className="drawer-toggle"
            style={{ marginRight: 5 }}
          />
          <Link prefetch href="/">
            <a className="logo logo-container">ChatApp</a>
          </Link>
          {this.props.loggedIn ? (
            <span className="hidden-sm">
              <Link prefetch href="/">
                <a className="nav-link desktop-nav-link">Home</a>
              </Link>
              <Link prefetch href="/chat">
                <a className="nav-link desktop-nav-link">Chat</a>
              </Link>
              <span className="nav-link">|</span>
              <a
                className="nav-link desktop-nav-link"
                onClick={this.logUserOut}
              >
                Logout
              </a>
            </span>
          ) : (
            <span className="hidden-sm">
              <Link prefetch href="/">
                <a className="nav-link desktop-nav-link">Home</a>
              </Link>
              <span className="nav-link desktop-nav-link">|</span>
              <Link prefetch href="/login">
                <a className="nav-link desktop-nav-link">Login</a>
              </Link>
              <Link prefetch href="/register">
                <a className="nav-link desktop-nav-link">Register</a>
              </Link>
            </span>
          )}
        </header>
        <input type="checkbox" id="drawer-checkbox" />
        <div className="drawer hidden-md hidden-lg">
          <label htmlFor="drawer-checkbox" className="close" />
          <nav style={{ border: 'none' }}>
            {this.props.loggedIn ? (
              <span>
                <Link href="/">
                  <a className="nav-link mobile-nav-link">Home</a>
                </Link>
                <Link href="/chat">
                  <a className="nav-link mobile-nav-link">Chat</a>
                </Link>
                <a
                  className="nav-link mobile-nav-link"
                  onClick={this.logUserOut}
                >
                  Logout
                </a>
              </span>
            ) : (
              <span>
                <Link prefetch href="/">
                  <a className="nav-link mobile-nav-link">Home</a>
                </Link>
                <Link prefetch href="/login">
                  <a className="nav-link mobile-nav-link">Login</a>
                </Link>
                <Link prefetch href="/register">
                  <a className="nav-link mobile-nav-link">Register</a>
                </Link>
              </span>
            )}
          </nav>
        </div>
        <style jsx>{`
          .desktop-nav-link {
            color: white;
            text-decoration: none;
          }
          .mobile-nav-link {
            color: black;
            font-size: 24px;
            padding: 5px;
            margin-bottom: 5px;
          }
          .logo-container {
            margin-right: 15px;
          }
          .nav-bar {
            background: #343f53;
            display: flex;
            position: fixed;
            width: 100%;
            align-items: center;
          }
          .nav-link {
            margin-right: 10px;
            cursor: pointer;
          }
        `}</style>
      </span>
    )
  }
}

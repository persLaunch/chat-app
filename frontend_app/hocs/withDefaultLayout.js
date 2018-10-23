import React, { Component } from 'react'

import Header from '../components/Header/Header'
import Navigation from '../components/Navigation/Navigation'
import PropTypes from 'prop-types'
import configureLoadingProgressBar from '../utils/routing'

export default ComposedComponent => {
  return class WithDefaultLayout extends Component {
    static propTypes = {
      user: PropTypes.object
    }

    componentDidMount() {
      configureLoadingProgressBar()
    }

    render() {
      return (
        <div>
          <Header title="eFounders" />
          <Navigation loggedIn={this.props.loggedIn} />
          <ComposedComponent {...this.props} />
          <style jsx global>{`
            body {
              padding-top: 45px;
            }
          `}</style>
        </div>
      )
    }
  }
}

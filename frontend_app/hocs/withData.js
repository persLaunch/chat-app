import 'isomorphic-fetch'

import { ApolloProvider, getDataFromTree } from 'react-apollo'
import React, { Component } from 'react'
import cookie from 'cookie'

import PropTypes from 'prop-types'
import { initClient } from '../utils/initClient'
import { loadAccessToken } from '../utils/cookieUtils'
import { loadGetInitialProps } from 'next/dist/lib/utils'

export default ComposedComponent =>
  class WithData extends Component {
    static propTypes = {
      headers: PropTypes.object,
      initialState: PropTypes.object
    }

    static async getInitialProps(ctx) {
      const subProps = await loadGetInitialProps(ComposedComponent, ctx)
      const headers = ctx.req ? ctx.req.headers : {}
      const client = initClient(headers)

      let token

      if (!process.browser) {
        const cookies = ctx.req.headers.cookie
          ? cookie.parse(ctx.req.headers.cookie)
          : {}
        token = cookies['accesstoken'] || null // ctx.req.cookies.accesstoken
      } else {
        token = loadAccessToken()
      }

      const props = {
        urlInfo: { query: ctx.query, pathname: ctx.pathname },
        loggedIn: Boolean(token),
        ...subProps
      }

      if (!process.browser) {
        await getDataFromTree(
          <ApolloProvider client={client}>
            <ComposedComponent {...props} />
          </ApolloProvider>
        )
      }

      return {
        initialState: {
          apollo: {
            data: client.cache.extract().data
          }
        },
        headers,
        ...props
      }
    }

    constructor(props) {
      super(props)
      this.client = initClient(this.props.headers, this.props.initialState)
    }

    render() {
      return (
        <ApolloProvider client={this.client}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }

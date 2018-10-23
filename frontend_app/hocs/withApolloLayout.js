import 'isomorphic-fetch'

import { ApolloProvider, getDataFromTree } from 'react-apollo'
import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { initClient } from '../utils/initClient'
import { loadGetInitialProps } from 'next/dist/lib/utils'

export default ComposedComponent =>
  class withApolloLayout extends Component {
    static propTypes = {
      headers: PropTypes.object,
      initialState: PropTypes.object
    }

    static async getInitialProps(ctx) {
      const subProps = await loadGetInitialProps(ComposedComponent, ctx)
      const headers = ctx.req ? ctx.req.headers : {}
      const client = initClient(headers)

      const props = {
        urlInfo: { query: ctx.query, pathname: ctx.pathname },
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

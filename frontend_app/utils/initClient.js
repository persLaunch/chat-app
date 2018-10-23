import { createHttpLink } from 'apollo-link-http';

import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

function _initClient(headers, initialState) {

  return new ApolloClient({
    initialState,
    link: from([
      createHttpLink({  
        uri : (process.env.BACKEND_HOST || 'http://localhost') + ':'+ (process.env.BACKEND_PORT || '3001') +'/graphql', 
        credentials: 'same-origin' 
      }),
    ])
   
    ,
    cache: new InMemoryCache(), 
    queryDeduplication: true,
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    connectToDevTools: process.browser
  })
}

export function initClient(headers, initialState = {}) {
  if (!process.browser) {
    return _initClient(headers, initialState)
  }
  if (!apolloClient) {
    apolloClient = _initClient(headers, initialState)
  }
  return apolloClient
}

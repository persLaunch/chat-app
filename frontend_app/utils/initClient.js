import { createHttpLink } from 'apollo-link-http';

import { ApolloClient} from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from } from 'apollo-link';
import fetch from 'isomorphic-fetch'
import { loadAccessToken } from './cookieUtils'
import cookie from 'cookie'


let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function _initClient(headers, initialState) {

  // Jamais appelé tant qu'on ne fait pas d'appel GraphQL
  const authMiddleware = new ApolloLink((operation, forward) => {

    // add the authorization to the headers
    const cookies = (headers.cookie ? cookie.parse(headers.cookie) : {});  
    let token = cookies['accesstoken'] || null; // ctx.req.cookies.accesstoken
  
    operation.setContext(({ headers = {}}) => ({
  
      headers: {
        ...headers,
        // Si browser on le prend direct depuis cookie pr car le middleware ne se reactualise pas, donc on veut le dernier token a jour
        // si SSR on le prend depuis header qui contient cookie du client
        authorization: "Bearer " + (process.browser ? loadAccessToken() : token),
      
      },
      
  
    }));
    
    return forward(operation);
  })
  

  return new ApolloClient({
    initialState,
    link: from([
      authMiddleware,
      createHttpLink({  
        uri : (process.env.BACKEND_HOST || 'http://localhost') + ':'+ (process.env.BACKEND_PORT || '3001') +'/graphql', 
        credentials: 'include' // CROSS ORIGIN il faudra héberger le server sur le même domaine que le client.
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

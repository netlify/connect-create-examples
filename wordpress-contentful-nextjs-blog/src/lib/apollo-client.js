import { ApolloClient, InMemoryCache, concat, ApolloLink, HttpLink } from '@apollo/client';

import { removeLastTrailingSlash } from 'lib/util';
let client;

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  const httpLink = new HttpLink({ uri: removeLastTrailingSlash(process.env.NETLIFY_CONNECT_ENDPOINT) });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.NETLIFY_CONNECT_TOKEN}`,
      },
    }));

    return forward(operation);
  });

  return new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        RootQuery: {
          queryType: true,
        },
        RootMutation: {
          mutationType: true,
        },
      },
    }),
  });
}

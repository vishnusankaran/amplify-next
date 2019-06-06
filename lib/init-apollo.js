import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri:
        "https://4aucp6p3n5gjzjgj5k6dp2jypm.appsync-api.us-east-2.amazonaws.com/graphql",
      cors: false,
      credentials: "omit", // Additional fetch() options like `credentials` or `headers`
      headers: {
        "x-api-key": "da2-m66lkshsxjatznu7xdfbnml4xi",
        "Access-Control-Allow-Origin": "*"
      },
      // Use fetch() polyfill on the server
      fetch: !process.browser && fetch
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
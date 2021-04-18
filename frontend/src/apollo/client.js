import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      "https://fiwcikb3ungozh45s2ztfol44e.appsync-api.us-east-1.amazonaws.com/graphql", // ENTER YOUR GRAPHQL ENDPOINT HERE
    fetch,
    headers: {
      "x-api-key": "da2-fig4hbjrhzacngtxumo2rjct34" , // ENTER YOUR API KEY HERE
    },
  }),
  cache: new InMemoryCache(),
})
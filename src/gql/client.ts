import { ApolloClient, InMemoryCache } from '@apollo/client'
import { LocalStorage } from '@/libs/localStorage.safely.util'

const headers: {
  'Access-Control-Allow-Origin': string
  'Access-Control-Allow-Credentials': string
  Authorization?: string
} = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
}

if (LocalStorage.getItem('accessToken')) {
  headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
}

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/graphql`,
  cache: new InMemoryCache(),
  headers: headers,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
})

export { client }

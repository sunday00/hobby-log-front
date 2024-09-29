import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support'
import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

function client() {
  const httpLink = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/graphql`,
    fetchOptions: { cache: 'force-cache' },
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    devtools: {
      name: 'hobby-log',
      enabled: true,
    },
  })
}

export { client }

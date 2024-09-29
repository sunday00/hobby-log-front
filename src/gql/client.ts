import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_BACKEND_HOST}/graphql`,
      fetchOptions: { cache: 'force-cache' },
    }),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    devtools: {
      name: 'hobby-log',
      enabled: true,
    },
  })
})

export { getClient }

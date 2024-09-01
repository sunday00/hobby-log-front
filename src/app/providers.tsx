'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/gql/client'
import GlobalContext from '@/libs/store.context'
import { movieInput } from '@/gql/types'

export function Providers({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    // update(data: any) {
    //   setState(Object.assign({}, state, data))
    // },
    movie: {
      movieInput: movieInput,
    },
  })

  return (
    <CacheProvider>
      <ChakraProvider>
        <GlobalContext.Provider value={state}>
          <ApolloProvider client={client}>{children}</ApolloProvider>
        </GlobalContext.Provider>
      </ChakraProvider>
    </CacheProvider>
  )
}

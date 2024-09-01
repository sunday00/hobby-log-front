'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import React, { ReactNode, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/gql/client'
import GlobalContext, { initialState } from '@/libs/store.context'

export function Providers({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    ...initialState,
    update,
  })

  function update(data: any) {
    setState(Object.assign({}, state, data))
  }

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

'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import React, { ReactNode, useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/gql/client'
import GlobalContext, { initialState } from '@/libs/store.context'

export function Providers({ children }: { children: ReactNode }) {
  const [state, setState] = useState({
    ...initialState,
    update,
  })
  const [isMount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  if (!isMount) {
    return null
  }

  function update(data: any) {
    setState(Object.assign({}, state, data))
  }

  return (
    <CacheProvider>
      <ChakraProvider>
        <GlobalContext.Provider value={state}>
          <ApolloProvider client={client}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            {children}
          </ApolloProvider>
        </GlobalContext.Provider>
      </ChakraProvider>
    </CacheProvider>
  )
}

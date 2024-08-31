'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/gql/client'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

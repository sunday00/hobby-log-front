import React from 'react'
import { movieInput } from '@/gql/types'

const GlobalContext = React.createContext({
  // update: (data: any) => {},
  movie: {
    movieInput: movieInput,
  },
})

export default GlobalContext

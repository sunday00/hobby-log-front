import React from 'react'
import { movieInput } from '@/gql/types'

export const initialState = {
  update: (date: any) => {},
  movie: {
    inputTitle: '',
    movieInput: movieInput,
  },
}

const GlobalContext = React.createContext(initialState)

export default GlobalContext

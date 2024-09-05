import React from 'react'
import { galleryInput, movieInput } from '@/gql/types'

export const initialState = {
  update: (date: any) => {},
  movie: {
    inputTitle: '',
    movieInput: movieInput,
  },
  gallery: {
    galleryInput: galleryInput,
  },
}

const GlobalContext = React.createContext(initialState)

export default GlobalContext

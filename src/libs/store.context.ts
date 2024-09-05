import React from 'react'
import { essayInput, galleryInput, movieInput } from '@/gql/types'

export const initialState = {
  update: (date: any) => {},
  movie: {
    inputTitle: '',
    movieInput: movieInput,
  },
  gallery: {
    galleryInput: galleryInput,
  },
  essay: {
    essayInput: essayInput,
  },
}

const GlobalContext = React.createContext(initialState)

export default GlobalContext

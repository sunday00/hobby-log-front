import React from 'react'
import { essayInput, galleryInput, movieInput } from '@/gql/types'
import { CategoryLowerCase, ContextObj } from '@/libs/types'

export const initialState: Required<{
  [key in CategoryLowerCase]: ContextObj
}> & {
  update: (data: any) => void
} = {
  update: (date: any) => {},
  movie: {
    inputTitle: '',
    input: movieInput,
  },
  gallery: {
    input: galleryInput,
  },
  essay: {
    input: essayInput,
    thumbnailCandidates: {
      type: 'url',
      cropper: '',
      url: '',
    },
  },
  draw: { input: { thumbnail: '' } },
  read: { input: { thumbnail: '' } },
  walk: { input: { thumbnail: '' } },
}

const GlobalContext = React.createContext(initialState)

export default GlobalContext

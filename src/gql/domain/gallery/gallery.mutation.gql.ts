import { gql } from '@apollo/client'

export const logGalleryMutation = gql`
  mutation LogGallery($input: GalleryInput) {
    createGalleryLog(galleryInput: $input) {
      id
      success
    }
  }
`

export const updateGalleryMutation = gql`
  mutation UpdateGallery($input: GalleryInput) {
    updateGalleryLog(galleryInput: $input) {
      id
      success
    }
  }
`

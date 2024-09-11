import { gql } from '@apollo/client'
import { gallery, imageEntity } from '@/gql/types'

const { subImages: _subImages, ...galleryFields } = gallery

export const getOneGalleryQuery = gql`
    query GetGalleryQuery($id: String!) {
        getOneGallery(id: $id) {
            ${Object.keys(galleryFields).join(' ')}
        }
    }
`

export const getOneGalleryWithSubImagesQuery = gql`
    query GetGalleryQuery($id: String!) {
        getOneGallery(id: $id) {
            ${Object.keys(galleryFields).join(' ')}
            subImages {
                ${Object.keys(imageEntity).join(' ')}
            }
        }
    }
`

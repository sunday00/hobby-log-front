import { gql } from '@apollo/client'
import { gallery } from '@/gql/types'

export const getOneGalleryQuery = gql`
    query GetGalleryQuery($id: String!) {
        getOneGallery(id: $id) {
            ${Object.keys(gallery).join(' ')}
        }
    }
`

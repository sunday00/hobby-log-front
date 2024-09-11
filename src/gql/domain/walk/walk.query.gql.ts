import { gql } from '@apollo/client'
import { imageEntity, walk } from '@/gql/types'

const { subImages: _s, ...walkFields } = walk

export const getOneWalkQuery = gql`
    query GetOneWalk($id: String) {
        getOneWalk(id: $id) {
            ${Object.keys(walkFields).join(' ')}
        }
    }
`

export const getOneWalkWithSubImagesQuery = gql`
    query GetOneWalk($id: String) {
        getOneWalk(id: $id) {
            ${Object.keys(walkFields).join(' ')}
            subImages {
                ${Object.keys(imageEntity).join(' ')}
            }
        }
    }
`

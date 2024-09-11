import { gql } from '@apollo/client'
import { imageEntity, read } from '@/gql/types'

const { subImages: _s, ...readFields } = read

export const getOneReadQuery = gql`
    query GetOneRead($id: String) {
        getOneRead(id: $id) {
            ${Object.keys(readFields).join(' ')}
        }
    }
`

export const getOneReadWithSubImagesQuery = gql`
    query GetOneRead($id: String) {
        getOneRead(id: $id) {
            ${Object.keys(readFields).join(' ')}
            subImages {
                ${Object.keys(imageEntity).join(' ')}
            }
        }
    }
`

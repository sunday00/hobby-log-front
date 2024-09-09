import { gql } from '@apollo/client'
import { read } from '@/gql/types'

export const getOneReadQuery = gql`
    query GetOneRead($id: String) {
        getOneRead(id: $id) {
            ${Object.keys(read).join(' ')}
        }
    }
`

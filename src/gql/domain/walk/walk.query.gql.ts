import { gql } from '@apollo/client'
import { walk } from '@/gql/types'

export const getOneWalkQuery = gql`
    query GetOneWalk($id: String) {
        getOneWalk(id: $id) {
            ${Object.keys(walk).join(' ')}
        }
    }
`

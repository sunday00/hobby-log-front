import { gql } from '@apollo/client'
import { draw } from '@/gql/types'

export const getOneDrawQuery = gql`
    query GetOneDraw($id: String) {
        getOneDraw(id: $id) {
            ${Object.keys(draw).join(' ')}
        }
    }
`

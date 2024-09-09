import { gql } from '@apollo/client'

export const logReadMutation = gql`
  mutation LogRead($input: ReadInput!) {
    createReadLog(readInput: $input) {
      id
      success
    }
  }
`

export const updateReadMutation = gql`
  mutation UpdateRead($input: ReadInput) {
    updateReadLog(readInput: $input) {
      id
      success
    }
  }
`

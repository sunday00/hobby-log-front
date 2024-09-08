import { gql } from '@apollo/client'

export const logWalkMutation = gql`
  mutation LogWalk($input: WalkInput!) {
    createWalkLog(walkInput: $input) {
      id
      success
    }
  }
`

export const updateWalkMutation = gql`
  mutation UpdateWalk($input: WalkInput) {
    updateWalkLog(walkInput: $input) {
      id
      success
    }
  }
`

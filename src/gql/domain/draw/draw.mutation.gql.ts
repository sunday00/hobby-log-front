import { gql } from '@apollo/client'

export const logDrawMutation = gql`
  mutation LogDraw($input: DrawInput!) {
    createDrawLog(drawInput: $input) {
      id
      success
    }
  }
`

export const updateDrawMutation = gql`
  mutation UpdateDraw($input: DrawInput) {
    updateDrawLog(drawInput: $input) {
      id
      success
    }
  }
`

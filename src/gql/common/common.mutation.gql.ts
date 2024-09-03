import { gql } from '@apollo/client'

export const updateStatusMutation = gql`
  mutation UpdateStatus($input: UpdateStatusInput) {
    updateStatus(updateStatusInput: $input) {
      id
      success
    }
  }
`

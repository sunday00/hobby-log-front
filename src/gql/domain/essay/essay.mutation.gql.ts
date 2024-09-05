import { gql } from '@apollo/client'

export const logEssayMutation = gql`
  mutation LogEssay($input: EssayInput!) {
    createEssayLog(essayInput: $input) {
      id
      success
    }
  }
`

export const updateEssayMutation = gql`
  mutation UpdateEssay($input: EssayInput) {
    updateEssayLog(essayInput: $input) {
      id
      success
    }
  }
`

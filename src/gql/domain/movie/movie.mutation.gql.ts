import { gql } from '@apollo/client'

export const logMovieMutation = gql`
  mutation LogMovie($input: MovieInput) {
    logMovie(movieInput: $input) {
      id
      success
    }
  }
`

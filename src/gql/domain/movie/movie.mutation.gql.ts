import { gql } from '@apollo/client'

export const logMovieMutation = gql`
  mutation LogMovie($input: MovieInput) {
    logMovie(movieInput: $input) {
      id
      success
    }
  }
`

export const updateMovieMutation = gql`
  mutation UpdateMovie($input: MovieInput) {
    updateMovie(movieInput: $input) {
      id
      success
    }
  }
`

'use client'

import { gql } from '@apollo/client'

export const signQuery = gql`
  query AuthQuery($code: String) {
    sign(code: $code) {
      accessToken
    }
  }
`

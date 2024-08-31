'use client'

import { gql } from '@apollo/client'
import { movieRaw } from '@/gql/types'

export const searchMoviesQuery = gql`
    query MovieSearch($search: String, $page: Long = 1) {
        searchMovies (search: $search, page: $page) {
          page
          results {
              ${Object.keys(movieRaw).join(' ')}
          }
          totalPages
          totalResults
        }
    }
`

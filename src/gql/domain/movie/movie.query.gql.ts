import { gql } from '@apollo/client'
import { casting, crew, imageEntity, movie, movieRaw } from '@/gql/types'

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

const { directors: _d, actors: _a, subImages: _s, ...movieFields } = movie

export const getOneMovieQuery = gql`
    query GetMovieQuery($id: String) {
        getOneMovie(id: $id) {
            ${Object.keys(movieFields).join(' ')}
            directors {
                ${Object.keys(crew).join(' ')}
            }
            actors {
                ${Object.keys(casting).join(' ')}
            }
        }
    }
`

export const getOneMovieWithSubImagesQuery = gql`
    query GetMovieQuery($id: String) {
        getOneMovie(id: $id) {
            ${Object.keys(movieFields).join(' ')}
            directors {
                ${Object.keys(crew).join(' ')}
            }
            actors {
                ${Object.keys(casting).join(' ')}
            }
            subImages {
                ${Object.keys(imageEntity).join(' ')}
            }
        }
    }
`

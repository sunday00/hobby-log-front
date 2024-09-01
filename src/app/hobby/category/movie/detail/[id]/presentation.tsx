'use client'

import { useQuery } from '@apollo/client'
import { getOneMovieQuery } from '@/gql/domain/movie/movie.query.gql'
import { Spinner } from '@chakra-ui/react'

const MovieDetailPresentation = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(getOneMovieQuery, {
    variables: { id },
  })

  if (loading) return <Spinner />

  if (error) {
    console.log(error.message)
  }

  return <></>
}

export { MovieDetailPresentation }

'use client'

import { useQuery } from '@apollo/client'
import { searchMoviesQuery } from '@/gql/domain/movie/movie.query.gql'

const HobbyCreatePage = () => {
  const { data, loading, error } = useQuery(searchMoviesQuery, {
    variables: { search: '방황', page: 1 },
  })

  return (
    <>
      todo
      <ul>
        <li>select log type</li>
        category...
      </ul>
    </>
  )
}

export default HobbyCreatePage

import { useQuery } from '@apollo/client'
import { searchMoviesQuery } from '@/gql/domain/movie/movie.query.gql'
import { useState } from 'react'
import { Box, Spinner, Stack, theme } from '@chakra-ui/react'
import { MovieRaw } from '@/gql/types'
import { MovieSearchResultItem } from '@/app/hobby/category/movie/create/(components)/movie.search.result.item'

const MovieSearchResults = ({ search }: { search: string }) => {
  const [page, setPage] = useState<number>(1)

  const { data, loading, error } = useQuery(searchMoviesQuery, {
    variables: {
      search,
      page,
    },
  })

  if (loading) return <Spinner />

  if (error) {
    return (
      <>
        <p>Error...</p>
        <p>{error.message}</p>
      </>
    )
  }

  const list = data.searchMovies.results.map((movie: MovieRaw) => {
    return (
      <Box key={movie.id}>
        <MovieSearchResultItem movie={movie} />
      </Box>
    )
  })

  return (
    <>
      <Stack p={theme.space['4']} h="85vh" overflowY="scroll" spacing={2}>
        {list}
      </Stack>
    </>
  )
}

export { MovieSearchResults }

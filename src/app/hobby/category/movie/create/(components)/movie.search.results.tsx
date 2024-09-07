import { useQuery } from '@apollo/client'
import { searchMoviesQuery } from '@/gql/domain/movie/movie.query.gql'
import { Box, Button, Flex, Spinner, Stack, theme } from '@chakra-ui/react'
import { MovieRaw } from '@/gql/types'
import { MovieSearchResultItem } from '@/app/hobby/category/movie/create/(components)/movie.search.result.item'

const MovieSearchResults = ({
  search,
  page = 1,
  setPage,
}: {
  search: string
  page: number
  setPage: (page: number) => void
}) => {
  const { data, loading, error } = useQuery(searchMoviesQuery, {
    variables: {
      search,
      page,
    },
  })

  if (loading) return <Spinner />

  // TODO: elegant error handle
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
      <Flex mb={theme.space['4']} gap={theme.space['4']}>
        <Button
          w="50%"
          onClick={() => {
            setPage(page - 1)
          }}
          isDisabled={page === 1}
          colorScheme="blue"
          variant="outline"
        >
          prev
        </Button>
        <Button
          w="50%"
          onClick={() => {
            setPage(page + 1)
          }}
          isDisabled={data?.searchMovies.totalPages === page}
          colorScheme="blue"
          variant="outline"
        >
          next
        </Button>
      </Flex>
      <Stack p={theme.space['4']} h="85vh" overflowY="scroll" spacing={2}>
        {list}
      </Stack>
    </>
  )
}

export { MovieSearchResults }

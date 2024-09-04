import { Category, Movie } from '@/gql/types'
import { Divider, Heading, Image, Stack, theme } from '@chakra-ui/react'
import { generateThumbnail } from '@/libs/url.grnerate.util'

const MovieEditReadonly = ({ movie }: { movie: Movie }) => {
  return (
    <Stack p={theme.space['4']} spacing={theme.space['4']}>
      <Stack className="readonly-head">
        <Heading as="h2">
          {movie.title} ({movie.releaseDate})
        </Heading>
      </Stack>

      <Stack direction="row" gap={theme.space['4']}>
        <Image
          src={generateThumbnail(movie.thumbnail, Category.Movie)}
          alt={movie.title + ' poster'}
        />
        <Stack>
          <p>{movie.id}</p>
          <p>{movie.movieId}</p>
          <Divider />
          <p>Director: {movie.directors?.[0]?.name}</p>
          <p>Audience ratings: {(movie.voteAverage ?? 0) * 10}</p>
        </Stack>
      </Stack>

      <Stack>
        <p>{movie.synopsis}</p>
      </Stack>

      <Stack
        p={theme.space['2']}
        border={theme.borders['2px']}
        borderColor={theme.colors.blue['400']}
        borderRadius={theme.radii['lg']}
      >
        <p style={{ textAlign: 'center' }}>
          Movie Basic info is fixed. If you want to replace with another movie,
          you should delete this log, then create New log.
        </p>
      </Stack>
    </Stack>
  )
}

export { MovieEditReadonly }

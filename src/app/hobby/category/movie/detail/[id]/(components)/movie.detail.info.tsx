'use client'

import { Movie } from '@/gql/types'
import {
  Box,
  Card,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  theme,
  useBreakpointValue,
} from '@chakra-ui/react'
import style from '@/app/(global)/(style)/global.module.scss'
import { FaClock } from 'react-icons/fa6'

const MovieDetailInfo = ({ movie }: { movie: Movie }) => {
  const ratingColor = (rating: number) => {
    if (rating >= 80) return 'green'
    if (rating >= 60) return 'yellow'
    if (rating >= 40) return 'orange'
    if (rating >= 20) return 'red'
    return 'black'
  }

  return (
    <Stack gap={theme.space['4']}>
      <section className="detail-info-header">
        <Heading as={'h2'}>{movie.title}</Heading>
        <Heading as={'h4'} size={theme.sizes.lg}>
          <Flex gap={theme.space['4']}>
            <Stack direction="row" gap={theme.space['2']}>
              <span>{movie.originalTitle}</span>
              <span>({movie.releaseDate})</span>
            </Stack>
            <Stack direction="row" alignItems="center">
              <FaClock />
              <span>{movie.runtime} min</span>
            </Stack>
          </Flex>
        </Heading>
      </section>

      <section>
        <p>{movie.tagline}</p>
        <p>{movie.originalTagline}</p>
      </section>

      <section style={{ marginTop: theme.space['4'] }}>
        <Grid
          templateColumns={useBreakpointValue({
            base: '1fr',
            lg: '300px 1fr 300px',
          })}
        >
          <Flex className="poster" justify={'center'} alignItems={'center'}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${movie.thumbnail}`}
              fallbackSrc={
                process.env.NEXT_PUBLIC_BACKEND_HOST +
                '/images/default/movie-default.jpeg'
              }
              alt={`${movie.title} poster`}
            ></Image>
          </Flex>
          <Flex
            ml={theme.space['2']}
            p={theme.space['2']}
            className="score"
            flexDirection="column"
          >
            <Flex justifyContent="space-between">
              <Flex>
                <Stack className="my" textAlign="center" ml={2}>
                  <CircularProgress
                    value={movie.ratings ?? 0}
                    size="140px"
                    color={ratingColor(movie.ratings ?? 0)}
                  >
                    <CircularProgressLabel>
                      {movie.ratings}
                    </CircularProgressLabel>
                  </CircularProgress>
                  <p>My Ratings</p>
                </Stack>
                <Stack className="peoples" textAlign="center" ml={2}>
                  <CircularProgress
                    value={(movie.voteAverage ?? 0) * 10}
                    size="140px"
                    color={ratingColor((movie.voteAverage ?? 0) * 10)}
                  >
                    <CircularProgressLabel>
                      {(movie.voteAverage ?? 0) * 10}
                    </CircularProgressLabel>
                  </CircularProgress>
                  <p>Audience Ratings</p>
                </Stack>
              </Flex>
              <Stack ml={theme.space['4']} alignItems="end">
                <Stack direction="row">
                  <span>Budget</span> | <span>{movie.budget}</span>
                </Stack>
                <Stack direction="row">
                  <span>Revenue</span> | <span>{movie.revenue}</span>
                </Stack>
                <Stack direction="row">
                  <span>Origin/Language</span> |{' '}
                  <span>
                    {movie.originalCountry}/{movie.language}
                  </span>
                </Stack>
              </Stack>
            </Flex>

            <Card
              className="directors"
              mt={theme.space['2']}
              p={theme.space['3']}
              flexDirection="row"
              gap={theme.space['2']}
            >
              <span>Directors: </span>
              <span>{movie.directors?.map((d) => d?.name).join(' ')}</span>
            </Card>

            <Card
              className={`casting ${style['ellipsis-one']}`}
              mt={theme.space['2']}
              p={theme.space['3']}
              flexDirection="row"
              gap={theme.space['2']}
            >
              <span>Castings: </span>
              <span>
                {movie.actors
                  ?.slice(0, 5)
                  .map((c) => c?.name)
                  .join(', ')}
                {(movie.actors ?? []).length > 5 ? ' ...' : ''}
              </span>
            </Card>
          </Flex>

          <Flex
            flexDirection="column"
            gap={theme.space['2']}
            px={theme.space['8']}
            py={theme.space['2']}
          >
            <Stack gap={theme.space['2']} direction="row">
              {movie.genres?.map((g) => <span key={g}>{g}</span>)}
            </Stack>
            <Box gap={theme.space['2']}>
              <p>{movie.keywords?.join(' / ')}</p>
            </Box>
          </Flex>
        </Grid>
      </section>
    </Stack>
  )
}

export { MovieDetailInfo }

'use client'

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { MovieRaw } from '@/gql/types'
import style from '@/app/(global)/(style)/movie.module.scss'
import { useContext } from 'react'
import GlobalContext from '@/libs/store.context'

const MovieSearchResultItem = ({ movie }: { movie: MovieRaw }) => {
  const global = useContext(GlobalContext)

  const setLogMovie = (id: number, title: string) => {
    global.movie.movieInput.movieId = id as unknown as undefined
    global.movie.inputTitle = title

    global.update(global)
  }

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: '100%', md: '540px' }}
        height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={'https://image.tmdb.org/t/p/w400' + movie.posterPath}
            fallbackSrc={
              process.env.NEXT_PUBLIC_BACKEND_HOST +
              '/images/default/movie-default.jpeg'
            }
            alt="#"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {movie.title}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={2}>
            {movie.originalTitle}
          </Text>
          <Text
            className={style['movie-raw-item-overview']}
            textAlign={'center'}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
          >
            {movie.overview}
          </Text>

          <Box>&#40;{movie.releaseDate}&#41;</Box>

          <Stack
            width={'100%'}
            mt={'2rem'}
            direction={'row'}
            padding={2}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              boxShadow={
                '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
              }
              _hover={{
                bg: 'blue.500',
              }}
              _focus={{
                bg: 'blue.500',
              }}
              onClick={() => setLogMovie(movie.id, movie.title!)}
            >
              Select
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  )
}

export { MovieSearchResultItem }

import { useContext, useEffect, useState } from 'react'
import GlobalContext from '@/libs/store.context'
import { Heading } from '@chakra-ui/react'

const MovieInputInfo = () => {
  const global = useContext(GlobalContext)
  const [title, setTitle] = useState('<- Search Movie First')
  const [movieId, setMovieId] = useState(0)

  useEffect(() => {
    if (global.movie.movieInput.movieId) {
      setTitle(global.movie.inputTitle)
      setMovieId(global.movie.movieInput.movieId)
    }
  }, [global.movie.movieInput.movieId, global.movie.inputTitle])

  return (
    <>
      <Heading as="h2" size="xl" isTruncated>
        {title} - {movieId}
      </Heading>
    </>
  )
}

export { MovieInputInfo }
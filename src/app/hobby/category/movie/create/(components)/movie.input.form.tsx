import React, { useContext, useState } from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Stack,
  Textarea,
  theme,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { MovieInput, Status } from '@/gql/types'
import GlobalContext from '@/libs/store.context'
import { useMutation } from '@apollo/client'
import { logMovieMutation } from '@/gql/domain/movie/movie.mutation.gql'

const MovieInputForm = () => {
  const today = new Date()
  const [ratings, setRatings] = useState<number>(75)
  const [content, setContent] = useState<string>('')
  const [logAtStrDate, setLogAtStrDate] = useState<string>(
    `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`,
  )
  const [logAtStrHH, setLogAtStrHH] = useState<number>(0)
  const [logAtStrMM, setLogAtStrMM] = useState<number>(0)
  const [status, setStatus] = useState<Status>(Status.Draft)

  const global = useContext(GlobalContext)

  const [logMovie] = useMutation(logMovieMutation)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const currentInput: MovieInput = {
      movieId: global.movie.movieInput.movieId,
      content,
      ratings,
      status,
      logAtStr: `${logAtStrDate}T${logAtStrHH.toString().padStart(2, '0')}:${logAtStrMM.toString().padStart(2, '0')}:00.000Z`,
    }

    const result = await logMovie({
      variables: { input: currentInput },
    })

    // TODO
    console.log(result)
    // TODO
    // success -> redirect to /hobby/movie/read/id
    // failed -> show error
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack gap={theme.space['4']}>
          <FormControl>
            <FormLabel htmlFor="rating">Rating</FormLabel>
            <Input
              id="rating"
              name="rating"
              type="number"
              value={ratings}
              onChange={(e) => setRatings(Number(e.target.value ?? 0))}
            />
            <FormHelperText>0-100, 5 step</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="content">Content</FormLabel>
            <Textarea
              id="content"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              value={content}
            ></Textarea>
            <FormHelperText>
              Experience about this movie, writing with MD
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="log-str-date">Watch time</FormLabel>
            <Flex gap={theme.space['4']}>
              <Input
                id="log-str-date"
                flex={3}
                name="logStrDate"
                type="date"
                value={logAtStrDate}
                onChange={(e) => setLogAtStrDate(e.target.value)}
              />
              <Input
                id="log-str-hh"
                flex={1}
                name="logStrHH"
                type="number"
                min={0}
                max={23}
                value={logAtStrHH}
                onChange={(e) => setLogAtStrHH(Number(e.target.value ?? 0))}
              />
              <Input
                id="log-str-mm"
                flex={1}
                name="logStrMM"
                type="number"
                min={0}
                max={59}
                value={logAtStrMM}
                onChange={(e) => setLogAtStrMM(Number(e.target.value ?? 0))}
              />
            </Flex>
            <FormHelperText>YYYY-MM-DD H:m</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="status">Status</FormLabel>
            <Select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value={Status.Draft}>DRAFT</option>
              <option value={Status.Active}>ACTIVE</option>
              <option value={Status.Deprecated}>DEPRECATED</option>
            </Select>
            <FormHelperText>
              recommend keep draft, update to active after recheck.
            </FormHelperText>
          </FormControl>

          <Button type="submit" colorScheme="blue">
            LOG MY HOBBY
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export { MovieInputForm }

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Spinner,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { ChangeEvent, useState } from 'react'
import { essaySearchSeriesQuery } from '@/gql/domain/essay/essay.query.gql'
import { Series } from '@/gql/types'
import { client } from '@/gql/next.client'

const EssaySeriesSearch = ({
  setSearchResults,
}: {
  setSearchResults: (series: Series[]) => void
}) => {
  const [search, setSearch] = useState('')
  const [debounce, setDebounce] = useState(null as unknown as number)

  const handleSeriesSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value as unknown as string
    setSearch(v)

    if (debounce) clearTimeout(debounce)

    const newDebounce = setTimeout(async () => {
      const { data, loading, error } = await client().query({
        query: essaySearchSeriesQuery,
        variables: { search: v },
      })

      if (loading) return <Spinner />

      // TODO: elegance error handle
      if (error) {
        return (
          <>
            <p>Error...</p>
            <p>{error.message}</p>
          </>
        )
      }

      setSearchResults(data.searchSeries)
    }, 300)

    setDebounce(newDebounce as unknown as number)
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="series-search">series-search</FormLabel>
        <Input
          id="series-search"
          type="text"
          name="series-search"
          value={search}
          onChange={(e) => handleSeriesSearch(e)}
        />
        <FormHelperText>use series search</FormHelperText>
      </FormControl>
    </>
  )
}

export { EssaySeriesSearch }

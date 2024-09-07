import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  theme,
} from '@chakra-ui/react'
import { EssaySeriesSearch } from '@/app/hobby/category/essay/create/(components)/(series)/essay.series.search'
import { EssaySeriesResult } from '@/app/hobby/category/essay/create/(components)/(series)/essay.series.result'
import { Input } from '@chakra-ui/input'
import { useState } from 'react'
import { Essay, Series } from '@/gql/types'

const EssaySeriesInput = ({ essay }: { essay?: Essay }) => {
  const [seriesKey, setSeriesKey] = useState(essay?.seriesKey ?? '')
  const [seriesName, setSeriesName] = useState(essay?.seriesName ?? '')

  const [searchResults, setSearchResults] = useState<Series[]>([])

  const handleSetSeries = (series: Series) => {
    setSeriesKey(series.seriesKey!)
    setSeriesName(series.seriesName!)
  }

  return (
    <>
      <Flex gap={theme.space['2']}>
        <EssaySeriesSearch setSearchResults={setSearchResults} />
        <EssaySeriesResult
          searchResults={searchResults}
          handleSetSeries={handleSetSeries}
        />

        <FormControl>
          <FormLabel htmlFor="series-key">series-key</FormLabel>
          <Input
            id="series-key"
            type="text"
            name="series-key"
            value={seriesKey}
            readOnly
          />
          <FormHelperText>use series search</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="series-name">series-name</FormLabel>
          <Input
            id="series-name"
            type="text"
            name="series-name"
            value={seriesName}
            onChange={(e) => setSeriesName(e.target.value)}
          />
          <FormHelperText>
            auto complete with using search or new series create
          </FormHelperText>
        </FormControl>
      </Flex>
    </>
  )
}

export { EssaySeriesInput }

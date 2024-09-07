import { Series, Status } from '@/gql/types'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import React, { useState } from 'react'

const EssaySeriesResult = ({
  searchResults,
  handleSetSeries,
}: {
  searchResults: Series[]
  handleSetSeries: (series: Series) => void
}) => {
  const [selectedSeries, setSelectedSeries] = useState('')

  const searchResultsEl = searchResults.map((s) => {
    return (
      <option key={s.seriesKey} value={s.seriesKey!}>
        {s.seriesName} - {s.logAt}
      </option>
    )
  })

  const handleLocalSetSeries = (seriesKey: string) => {
    const series = searchResults.find((s) => s.seriesKey === seriesKey)

    if (series) {
      setSelectedSeries(seriesKey)
      handleSetSeries(series)
    }
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="select-search">series</FormLabel>
        <Select
          id="select-search"
          name="select-search"
          value={selectedSeries}
          onChange={(e) => handleLocalSetSeries(e.target.value)}
        >
          <option value={''}>no series or create new series</option>
          {searchResultsEl}
        </Select>
        <FormHelperText>series select</FormHelperText>
      </FormControl>
    </>
  )
}

export { EssaySeriesResult }
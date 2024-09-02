'use client'

import { Stack, theme } from '@chakra-ui/react'

const MovieDetailOverview = ({
  overviews,
}: {
  overviews: { synopsis?: string; originalSynopsis?: string }
}) => {
  return (
    <>
      <Stack p={theme.space['2']} gap={theme.space['4']} mb={theme.space['4']}>
        <p>{overviews.synopsis}</p>
        <p>{overviews.originalSynopsis}</p>
      </Stack>
    </>
  )
}

export { MovieDetailOverview }

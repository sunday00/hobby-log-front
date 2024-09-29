'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { dateFormat } from '@/libs/conv.util'
import { Movie } from '@/gql/types'
import { FilterActiveMy } from '@/app/(global)/(components)/detail-user-controle/filter.active.my'

const MovieDetailPresentation = ({
  children,

  movie,
}: {
  children: ReactNode

  movie: Movie
}) => {
  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Movie"
        dddd={dateFormat(movie.logAt, 'YYYY-MM')}
      />
      <Box maxW="6xl" mx="auto">
        <FilterActiveMy content={movie}>{children}</FilterActiveMy>
      </Box>
    </>
  )
}

export { MovieDetailPresentation }

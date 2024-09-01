'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { MovieSearchBase } from '@/app/hobby/category/movie/create/(components)/movie.search.base'
import { MovieInputBase } from '@/app/hobby/category/movie/create/(components)/movie.input.base'
import { Grid, theme } from '@chakra-ui/react'

const MovieCreatePresentation = () => {
  return (
    <>
      <BreadcrumbWarp name="category.create" category="Movie" />
      <Grid templateColumns="1fr 2fr" gap={theme.space['4']}>
        <MovieSearchBase />
        <MovieInputBase />
      </Grid>
    </>
  )
}

export { MovieCreatePresentation }

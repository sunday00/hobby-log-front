'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Grid, Spinner, theme } from '@chakra-ui/react'
import { MovieEditReadonly } from '@/app/hobby/category/movie/edit/[id]/(components)/movie.edit.readonly'
import { useQuery } from '@apollo/client'
import { getOneMovieQuery } from '@/gql/domain/movie/movie.query.gql'
import { Movie } from '@/gql/types'
import { MovieInputForm } from '@/app/hobby/category/movie/create/(components)/movie.input.form'

const MovieEditPresentation = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(getOneMovieQuery, {
    variables: { id },
  })

  if (loading) return <Spinner />

  if (error) {
    return (
      <>
        <p>Error...</p>
        <p>{error.message}</p>
      </>
    )
  }

  return (
    <>
      <BreadcrumbWarp name="category.edit" category="Movie" />
      <Grid templateColumns="1fr 2fr" gap={theme.space['4']}>
        <MovieEditReadonly movie={data.getOneMovie} />
        <MovieInputForm movie={data.getOneMovie as Movie} />
      </Grid>
    </>
  )
}

export { MovieEditPresentation }

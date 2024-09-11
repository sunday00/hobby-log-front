'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Grid, Spinner, Stack, theme } from '@chakra-ui/react'
import { MovieEditReadonly } from '@/app/hobby/category/movie/edit/[id]/(components)/movie.edit.readonly'
import { useQuery } from '@apollo/client'
import { getOneMovieWithSubImagesQuery } from '@/gql/domain/movie/movie.query.gql'
import { Movie } from '@/gql/types'
import { MovieInputForm } from '@/app/hobby/category/movie/create/(components)/movie.input.form'
import { SubImageUploader } from '@/app/(global)/(components)/sub-image.uploader'

const MovieEditPresentation = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(getOneMovieWithSubImagesQuery, {
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
        <Stack>
          <MovieInputForm movie={data.getOneMovie as Movie} />
        </Stack>
      </Grid>

      {data.getOneMovie && (
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <div></div>
          <SubImageUploader hobby={data.getOneMovie} />
        </Grid>
      )}
    </>
  )
}

export { MovieEditPresentation }

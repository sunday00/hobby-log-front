import { getOneMovieQuery } from '@/gql/domain/movie/movie.query.gql'
import { getClient } from '@/gql/client'
import { MovieDetailInfo } from '@/app/hobby/category/movie/detail/[id]/(components)/movie.detail.info'
import { theme } from '@chakra-ui/react'
import { MovieDetailOverview } from '@/app/hobby/category/movie/detail/[id]/(components)/movie.detail.overview'
import { MovieDetailPresentation } from '@/app/hobby/category/movie/detail/[id]/presentation'
import { notFound } from 'next/navigation'
import { generateArticleFullMeta, MetaArg } from '@/libs/head.generate'
import { generateThumbnail } from '@/libs/url.grnerate.util'
import { Category } from '@/gql/types'
import { MDDetailContent } from '@/app/(global)/(components)/md.detail.content'

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  try {
    const { data, loading, error } = await getClient().query({
      query: getOneMovieQuery,
      variables: { id },
    })

    const { contents, synopsis, originalSynopsis, userId, status, ...info } =
      data?.getOneMovie

    const args: MetaArg = {
      title: data.getOneMovie.title,
      url:
        process.env['NEXT_PUBLIC_FRONT_HOST'] +
        '/hobby/category/movie/detail/' +
        data.getOneMovie.id,
      thumbnail: generateThumbnail(data.getOneMovie.thumbnail, Category.Movie),
      description: data.getOneMovie.tagline,
      keywords: data.getOneMovie.keywords,
    }

    return generateArticleFullMeta(args)
  } catch (e) {
    return notFound()
  }
}

const MovieDetail = async ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = await getClient().query({
    query: getOneMovieQuery,
    variables: { id: params.id },
  })

  const movie = data.getOneMovie

  return (
    <MovieDetailPresentation movie={movie}>
      <section className="info" style={{ marginBottom: theme.space['8'] }}>
        <MovieDetailInfo movie={movie} status={movie.status} />
      </section>
      <section>
        <MovieDetailOverview
          overviews={{
            synopsis: movie.synopsis,
            originalSynopsis: movie.originalSynopsis,
          }}
        />
      </section>

      <MDDetailContent content={movie.contents} />
    </MovieDetailPresentation>
  )
}

export default MovieDetail

import { getOneMovieQuery } from '@/gql/domain/movie/movie.query.gql'
import { client } from '@/gql/client'
import { MovieDetailContent } from '@/app/hobby/category/movie/detail/[id]/(components)/movie.detail.content'
import style from '@/app/(global)/(style)/movie.module.scss'
import { MovieDetailInfo } from '@/app/hobby/category/movie/detail/[id]/(components)/movie.detail.info'
import { theme } from '@chakra-ui/react'
import { MovieDetailOverview } from '@/app/hobby/category/movie/detail/[id]/(components)/movie.detail.overview'
import { MovieDetailPresentation } from '@/app/hobby/category/movie/detail/[id]/presentation'
import { notFound } from 'next/navigation'
import { generateArticleFullMeta, MetaArg } from '@/libs/head.generate'
import { generateThumbnail } from '@/libs/url.grnerate.util'
import { Category } from '@/gql/types'

export const fetchCache = 'force-no-store'

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: number }
}) => {
  try {
    const { data, loading, error } = await client.query({
      query: getOneMovieQuery,
      variables: { id },
    })

    const { contents, synopsis, originalSynopsis, userId, status, ...info } =
      data.getOneMovie

    const args: MetaArg = {
      title: data.getOneMovie.title,
      url:
        process.env['NEXT_PUBLIC_FRONT_HOST'] +
        '/hobby/category/movie/detail/' +
        data.getOneMovie.utl,
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
  const { data, loading, error } = await client.query({
    query: getOneMovieQuery,
    variables: { id: params.id },
  })

  const { contents, synopsis, originalSynopsis, userId, status, ...info } =
    data.getOneMovie

  return (
    <>
      <MovieDetailPresentation
        id={params.id}
        logAt={info.logAt}
        userId={userId}
        status={status}
      >
        <section className="info" style={{ marginBottom: theme.space['8'] }}>
          <MovieDetailInfo movie={info} status={status} />
        </section>
        <section>
          <MovieDetailOverview overviews={{ synopsis, originalSynopsis }} />
        </section>
        <section className={style['markdown-body']}>
          <MovieDetailContent content={contents}></MovieDetailContent>
        </section>
      </MovieDetailPresentation>
    </>
  )
}

export default MovieDetail

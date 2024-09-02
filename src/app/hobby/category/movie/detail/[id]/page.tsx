import { getOneMovieQuery } from '@/gql/domain/movie/movie.query.gql'
import { client } from '@/gql/client'
import { MovieDetailContent } from '@/app/hobby/category/movie/detail/[id]/(components)/movie.detail.content'
import style from '@/app/(global)/(style)/movie.module.scss'
import { MovieDetailInfo } from '@/app/hobby/category/movie/detail/[id]/(components)/movie.detail.info'
import { theme } from '@chakra-ui/react'

const MovieDetail = async ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = await client.query({
    query: getOneMovieQuery,
    variables: { id: params.id },
  })

  console.log(data)

  const { contents, ...info } = data.getOneMovie

  return (
    <>
      <section className="info" style={{ marginBottom: theme.space['8'] }}>
        <MovieDetailInfo movie={info} />
      </section>
      <section className={style['markdown-body']}>
        <MovieDetailContent content={contents}></MovieDetailContent>
      </section>
    </>
  )
}

export default MovieDetail

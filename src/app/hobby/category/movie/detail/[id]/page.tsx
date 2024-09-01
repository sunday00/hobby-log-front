import { MovieDetailPresentation } from '@/app/hobby/category/movie/detail/[id]/presentation'

const MovieDetail = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <MovieDetailPresentation id={params.id} />
    </>
  )
}

export default MovieDetail

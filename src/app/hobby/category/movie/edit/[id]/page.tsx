import { MovieEditPresentation } from '@/app/hobby/category/movie/edit/[id]/presentation'
const MovieEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <MovieEditPresentation id={params.id} />
    </>
  )
}

export default MovieEditPage

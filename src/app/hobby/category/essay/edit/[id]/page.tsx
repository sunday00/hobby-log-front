import { EssayEditPresentation } from '@/app/hobby/category/essay/edit/[id]/presentation'

const EssayEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <EssayEditPresentation id={params.id} />
    </>
  )
}

export default EssayEditPage

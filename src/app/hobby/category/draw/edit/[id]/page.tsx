import { DrawEditPresentation } from '@/app/hobby/category/draw/edit/[id]/presentation'

const DrawEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <DrawEditPresentation id={params.id} />
    </>
  )
}

export default DrawEditPage

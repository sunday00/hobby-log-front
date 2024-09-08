import { WalkEditPresentation } from '@/app/hobby/category/walk/edit/[id]/presentation'

const WalkEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <WalkEditPresentation id={params.id} />
    </>
  )
}

export default WalkEditPage

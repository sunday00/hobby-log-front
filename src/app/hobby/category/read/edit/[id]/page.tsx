import { ReadEditPresentation } from '@/app/hobby/category/read/edit/[id]/presentation'

const ReadEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ReadEditPresentation id={params.id} />
    </>
  )
}

export default ReadEditPage

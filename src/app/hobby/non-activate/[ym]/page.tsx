import { ManageNonActivatePresentation } from '@/app/hobby/non-activate/[ym]/presentation'

const ManageNonActivatePage = ({ params }: { params: { ym: string } }) => {
  return (
    <>
      <ManageNonActivatePresentation ym={params.ym} />
    </>
  )
}

export default ManageNonActivatePage

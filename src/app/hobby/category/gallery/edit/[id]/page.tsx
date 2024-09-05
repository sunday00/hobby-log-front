import { GalleryEditPresentation } from '@/app/hobby/category/gallery/edit/[id]/presentation'

const GalleryEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <GalleryEditPresentation id={params.id} />
    </>
  )
}

export default GalleryEditPage

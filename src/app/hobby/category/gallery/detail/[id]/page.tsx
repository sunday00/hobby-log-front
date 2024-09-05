import { client } from '@/gql/client'
import { getOneGalleryQuery } from '@/gql/domain/gallery/gallery.query.gql'
import { GalleryDetailPresentation } from '@/app/hobby/category/gallery/detail/[id]/presentation'
import { MDDetailContent } from '@/app/(global)/(components)/md.detail.content'
import { GalleryDetailInfo } from '@/app/hobby/category/gallery/detail/[id]/(components)/gallery.detail.info'

export const fetchCache = 'force-no-store'

const GalleryDetailPage = async ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = await client.query({
    query: getOneGalleryQuery,
    variables: { id: params.id },
  })

  const { content, logAt, userId, status, ...galleryFields } =
    data.getOneGallery

  return (
    <>
      <GalleryDetailPresentation
        logAt={logAt}
        userId={userId}
        id={params.id}
        status={status}
      >
        <section style={{ marginBottom: '1em' }}>
          <GalleryDetailInfo
            gallery={galleryFields}
            logAt={logAt}
            status={status}
          />
        </section>

        <MDDetailContent content={content} />
      </GalleryDetailPresentation>
    </>
  )
}

export default GalleryDetailPage

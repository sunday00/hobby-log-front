import { client } from '@/gql/client'
import { getOneGalleryQuery } from '@/gql/domain/gallery/gallery.query.gql'
import { GalleryDetailPresentation } from '@/app/hobby/category/gallery/detail/[id]/presentation'
import { MDDetailContent } from '@/app/(global)/(components)/md.detail.content'
import { GalleryDetailInfo } from '@/app/hobby/category/gallery/detail/[id]/(components)/gallery.detail.info'
import { generateArticleFullMeta, MetaArg } from '@/libs/head.generate'
import { generateThumbnail } from '@/libs/url.grnerate.util'
import { Category } from '@/gql/types'
import { notFound } from 'next/navigation'

export const fetchCache = 'force-no-store'

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  try {
    const { data, loading, error } = await client.query({
      query: getOneGalleryQuery,
      variables: { id },
    })

    const args: MetaArg = {
      title: data.getOneGallery.title,
      url:
        process.env['NEXT_PUBLIC_FRONT_HOST'] +
        '/hobby/category/gallery/detail/' +
        data.getOneGallery.id,
      thumbnail: generateThumbnail(
        data.getOneGallery.thumbnail,
        Category.Gallery,
      ),
      description: data.getOneGallery.overview,
      keywords: [
        data.getOneGallery.title,
        data.getOneGallery.galleryType,
        data.getOneGallery.location,
      ],
    }

    return generateArticleFullMeta(args)
  } catch (e) {
    return notFound()
  }
}

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

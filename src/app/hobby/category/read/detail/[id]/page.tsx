import { ReadDetailPresentation } from '@/app/hobby/category/read/detail/[id]/presentation'
import { getClient } from '@/gql/client'
import { Spinner } from '@chakra-ui/react'
import { Category, Read } from '@/gql/types'
import { getOneReadQuery } from '@/gql/domain/read/read.query.gql'
import { ReadDetailInfo } from '@/app/hobby/category/read/detail/[id]/(components)/read.detail.info'
import { MDDetailContent } from '@/app/(global)/(components)/md.detail.content'
import { generateArticleFullMeta, MetaArg } from '@/libs/head.generate'
import { generateThumbnail } from '@/libs/url.grnerate.util'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  try {
    const { data, loading, error } = await getClient().query({
      query: getOneReadQuery,
      variables: { id },
    })

    const args: MetaArg = {
      title: data.getOneRead.title,
      url:
        process.env['NEXT_PUBLIC_FRONT_HOST'] +
        '/hobby/category/read/detail/' +
        data.getOneRead.id,
      thumbnail: generateThumbnail(data.getOneRead.thumbnail, Category.Read),
      description: data.getOneRead.title,
      keywords: [data.getOneRead.title],
    }

    return generateArticleFullMeta(args)
  } catch (e) {
    return notFound()
  }
}

const ReadDetailPage = async ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = await getClient().query({
    query: getOneReadQuery,
    variables: { id: params.id },
  })

  if (loading) return <Spinner />

  // TODO: elegant error handle
  if (error) {
    return (
      <>
        <p>Error...</p>
        <p>{error.message}</p>
      </>
    )
  }

  const read: Read = data.getOneRead

  return (
    <>
      <ReadDetailPresentation read={read}>
        <section style={{ marginBottom: '1em' }}>
          <ReadDetailInfo read={read} />
        </section>

        <MDDetailContent content={read?.content ?? ''} />
      </ReadDetailPresentation>
    </>
  )
}

export default ReadDetailPage

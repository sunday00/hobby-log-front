import { WalkDetailPresentation } from '@/app/hobby/category/walk/detail/[id]/presentation'
import { getClient } from '@/gql/client'
import { Spinner } from '@chakra-ui/react'
import { Category, Walk } from '@/gql/types'
import { getOneWalkQuery } from '@/gql/domain/walk/walk.query.gql'
import { WalkDetailInfo } from '@/app/hobby/category/walk/detail/[id]/(components)/walk.detail.info'
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
      query: getOneWalkQuery,
      variables: { id },
    })

    const args: MetaArg = {
      title: data.getOneWalk.title,
      url:
        process.env['NEXT_PUBLIC_FRONT_HOST'] +
        '/hobby/category/walk/detail/' +
        data.getOneWalk.id,
      thumbnail: generateThumbnail(data.getOneWalk.thumbnail, Category.Walk),
      description: data.getOneWalk.title,
      keywords: [data.getOneWalk.title],
    }

    return generateArticleFullMeta(args)
  } catch (e) {
    return notFound()
  }
}

const WalkDetailPage = async ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = await getClient().query({
    query: getOneWalkQuery,
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

  const walk: Walk = data.getOneWalk

  return (
    <WalkDetailPresentation walk={walk}>
      <section style={{ marginBottom: '1em' }}>
        <WalkDetailInfo walk={walk} />
      </section>

      <MDDetailContent content={walk?.content ?? ''} />
    </WalkDetailPresentation>
  )
}

export default WalkDetailPage

import { EssayDetailPresentation } from '@/app/hobby/category/essay/detail/[id]/presentation'
import { getOneEssayQuery } from '@/gql/domain/essay/essay.query.gql'
import { Category, Essay } from '@/gql/types'
import { Spinner } from '@chakra-ui/react'
import { getClient } from '@/gql/client'
import { MDDetailContent } from '@/app/(global)/(components)/md.detail.content'
import { generateArticleFullMeta, MetaArg } from '@/libs/head.generate'
import { generateThumbnail } from '@/libs/url.grnerate.util'
import { notFound } from 'next/navigation'
import { EssayDetailInfo } from '@/app/hobby/category/essay/detail/[id]/(components)/essay.detail.info'

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  try {
    const { data, loading, error } = await getClient().query({
      query: getOneEssayQuery,
      variables: { id },
    })

    const args: MetaArg = {
      title: data.getOneEssay.title,
      url:
        process.env['NEXT_PUBLIC_FRONT_HOST'] +
        '/hobby/category/essay/detail/' +
        data.getOneEssay.id,
      thumbnail: generateThumbnail(data.getOneEssay.thumbnail, Category.Essay),
      description: data.getOneEssay.title,
      keywords: [data.getOneEssay.writingType, data.getOneEssay.seriesName],
    }

    return generateArticleFullMeta(args)
  } catch (e) {
    return notFound()
  }
}

const EssayDetailPage = async ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = await getClient().query({
    query: getOneEssayQuery,
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

  const essay: Essay = data?.getOneEssay

  return (
    <>
      <EssayDetailPresentation essay={essay}>
        <section style={{ marginBottom: '1em' }}>
          <EssayDetailInfo essay={essay} />
        </section>

        <MDDetailContent content={essay?.content ?? ''} />
      </EssayDetailPresentation>
    </>
  )
}

export default EssayDetailPage

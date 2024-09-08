import { DrawDetailPresentation } from '@/app/hobby/category/draw/detail/[id]/presentation'
import { client } from '@/gql/client'
import { Grid, Spinner, Image, theme } from '@chakra-ui/react'
import { Category, Draw } from '@/gql/types'
import { getOneDrawQuery } from '@/gql/domain/draw/draw.query.gql'
import { DrawDetailInfo } from '@/app/hobby/category/draw/detail/[id]/(components)/draw.detail.info'
import { MDDetailContent } from '@/app/(global)/(components)/md.detail.content'
import { generateArticleFullMeta, MetaArg } from '@/libs/head.generate'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'
import { notFound } from 'next/navigation'

export const fetchCache = 'force-no-store'

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  try {
    const { data, loading, error } = await client.query({
      query: getOneDrawQuery,
      variables: { id },
    })

    const args: MetaArg = {
      title: data.getOneDraw.title,
      url:
        process.env['NEXT_PUBLIC_FRONT_HOST'] +
        '/hobby/category/draw/detail/' +
        data.getOneDraw.id,
      thumbnail: generateThumbnail(data.getOneDraw.thumbnail, Category.Draw),
      description: data.getOneDraw.title,
      keywords: [data.getOneDraw.title],
    }

    return generateArticleFullMeta(args)
  } catch (e) {
    return notFound()
  }
}

const DrawDetailPage = async ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = await client.query({
    query: getOneDrawQuery,
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

  const draw: Draw = data.getOneDraw

  return (
    <>
      <DrawDetailPresentation draw={draw}>
        <section style={{ marginBottom: '1em' }}>
          <DrawDetailInfo draw={draw} />
        </section>

        <Grid templateColumns="3fr 2fr" gap={theme.space['2']}>
          <Image
            src={generateThumbnail(draw?.mainImage as string, Category.Draw)}
            alt={draw?.title + ' image'}
          />
          <MDDetailContent content={draw?.content ?? ''} />
        </Grid>
      </DrawDetailPresentation>
    </>
  )
}

export default DrawDetailPage

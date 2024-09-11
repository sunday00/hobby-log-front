'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Grid, Spinner, theme } from '@chakra-ui/react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { FormEvent, useContext } from 'react'
import GlobalContext from '@/libs/store.context'
import { updateEssayMutation } from '@/gql/domain/essay/essay.mutation.gql'
import { getOneEssayWithSubImagesQuery } from '@/gql/domain/essay/essay.query.gql'
import { EssayCreateLeft } from '@/app/hobby/category/essay/create/(components)/essay.create.left'
import { EssayCreateRight } from '@/app/hobby/category/essay/create/(components)/essay.create.right'
import { EssayInput, Status, WritingType } from '@/gql/types'
import { SubImageUploader } from '@/app/(global)/(components)/sub-image.uploader'

const EssayEditPresentation = ({ id }: { id: string }) => {
  const global = useContext(GlobalContext)
  const [updateEssay] = useMutation(updateEssayMutation)

  const { data, loading, error } = useQuery(getOneEssayWithSubImagesQuery, {
    variables: { id },
  })

  if (loading) return <Spinner />

  // TODO: elegance error handle
  if (error) {
    return (
      <>
        <p>Error...</p>
        <p>{error.message}</p>
      </>
    )
  }

  global.essay.input = data.getOneEssay

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    const logAt =
      form.get('logStrDD') +
      'T' +
      form.get('logStrHH')?.toString().padStart(2, '0') +
      ':' +
      form.get('logStrMM')?.toString().padStart(2, '0') +
      ':00.000Z'

    const inp: EssayInput = {
      id,
      title: form.get('title') as string,
      writingType: form.get('writingType') as WritingType,
      content: form.get('content') as string,
      logAtStr: logAt,
      seriesKey: form.get('series-key') as string,
      seriesName: form.get('series-name') as string,
      status: form.get('status') as Status,
      thumbnail: (form.get(
        form.get('thumbnail-type') === 'cropper'
          ? 'thumbnail-crop'
          : 'thumbnail-url',
      ) ?? '') as string,
    }

    const { data, errors } = await updateEssay({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.updateEssayLog.success) {
      console.error(data?.updateEssayLog.message ?? 'something went wrong')
    }

    if (data?.updateEssayLog.success) {
      location.href = `/hobby/category/essay/detail/${data?.updateEssayLog.id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.edit" category="Essay" />
      <form onSubmit={handleSubmit}>
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <EssayCreateLeft essay={data.getOneEssay} />
          <EssayCreateRight essay={data.getOneEssay} />
        </Grid>
      </form>

      {data?.getOneEssay && (
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <div></div>
          <SubImageUploader hobby={data?.getOneEssay} />
        </Grid>
      )}
    </>
  )
}

export { EssayEditPresentation }

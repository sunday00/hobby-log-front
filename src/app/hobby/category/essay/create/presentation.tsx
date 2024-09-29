'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Grid, theme } from '@chakra-ui/react'
import { EssayCreateLeft } from '@/app/hobby/category/essay/create/(components)/essay.create.left'
import { EssayCreateRight } from '@/app/hobby/category/essay/create/(components)/essay.create.right'
import { FormEvent } from 'react'
import { EssayInput, Status, WritingType } from '@/gql/types'
import { useMutation } from '@apollo/client'
import { logEssayMutation } from '@/gql/domain/essay/essay.mutation.gql'
import { reValidator } from '@/libs/actions'

const EssayCreatePresentation = () => {
  const [logEssay] = useMutation(logEssayMutation)

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

    const { data, errors } = await logEssay({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.['createEssayLog']?.success) {
      console.error(data?.['createEssayLog']?.message ?? 'something went wrong')
    }

    if (data?.['createEssayLog']?.success) {
      await Promise.all([
        reValidator(`/hobby/category/monthly/${logAt.substring(0, 7)}`),
        reValidator(`/hobby/non-activate/${logAt.substring(0, 7)}`),
      ])

      location.href = `/hobby/category/essay/detail/${data?.['createEssayLog'].id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.create" category="Essay" />
      <form onSubmit={handleSubmit}>
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <EssayCreateLeft />
          <EssayCreateRight />
        </Grid>
      </form>
    </>
  )
}

export { EssayCreatePresentation }

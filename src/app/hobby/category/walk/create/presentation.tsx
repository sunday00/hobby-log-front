'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { FormEvent } from 'react'
import { WalkCreateLeft } from '@/app/hobby/category/walk/create/(components)/walk.create.left'
import { WalkCreateRight } from '@/app/hobby/category/walk/create/(components)/walk.create.right'
import { Grid, theme } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { logWalkMutation } from '@/gql/domain/walk/walk.mutation.gql'
import { Status, WalkInput } from '@/gql/types'
import { reValidator } from '@/libs/actions'

const WalkCreatePresentation = () => {
  const [logWalk] = useMutation(logWalkMutation)

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

    const inp: WalkInput = {
      title: form.get('title') as string,
      content: form.get('content') as string,
      logAtStr: logAt,
      status: form.get('status') as Status,
      thumbnail: (form.get(
        form.get('thumbnail-type') === 'cropper'
          ? 'thumbnail-crop'
          : 'thumbnail-url',
      ) ?? '') as string,
      steps: Number(form.get('steps') ?? 0),
      duration: Number(form.get('duration') ?? 0),
      distance: Number(form.get('distance') ?? 0),
    }

    const { data, errors } = await logWalk({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.['createWalkLog']?.success) {
      console.error(data?.['createWalkLog']?.message ?? 'something went wrong')
    }

    if (data?.['createWalkLog']?.success) {
      await Promise.all([
        reValidator(`/hobby/category/monthly/${logAt.substring(0, 7)}`),
        reValidator(`/hobby/non-activate/${logAt.substring(0, 7)}`),
      ])

      location.href = `/hobby/category/walk/detail/${data?.['createWalkLog'].id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.create" category="Walk" />
      {/* TODO: ADD USING KAKAO MAP DEV https://apis.map.kakao.com/web/sample/ */}
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="1fr 2fr" gap={theme.space['4']}>
          <WalkCreateLeft />
          <WalkCreateRight />
        </Grid>
      </form>
    </>
  )
}

export { WalkCreatePresentation }

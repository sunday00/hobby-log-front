'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { FormEvent } from 'react'
import { ReadCreateLeft } from '@/app/hobby/category/read/create/(components)/read.create.left'
import { ReadCreateRight } from '@/app/hobby/category/read/create/(components)/read.create.right'
import { Grid, theme } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { logReadMutation } from '@/gql/domain/read/read.mutation.gql'
import { ReadInput, ReadType, Status } from '@/gql/types'
import { reValidator } from '@/libs/actions'
import { usePathname } from 'next/navigation'

const ReadCreatePresentation = () => {
  const pathName = usePathname()
  const [logRead] = useMutation(logReadMutation)

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

    const inp: ReadInput = {
      title: form.get('title') as string,
      content: form.get('content') as string,
      logAtStr: logAt,
      status: form.get('status') as Status,
      thumbnail: (form.get(
        form.get('thumbnail-type') === 'cropper'
          ? 'thumbnail-crop'
          : 'thumbnail-url',
      ) ?? '') as string,
      overview: form.get('overview') as string,
      writer: form.get('writer') as string,
      readType: form.get('readType') as ReadType,
      ratings: Number(form.get('ratings') ?? 0),
    }

    const { data, errors } = await logRead({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.['createReadLog']?.success) {
      console.error(data?.['createReadLog']?.message ?? 'something went wrong')
    }

    if (data?.['createReadLog']?.success) {
      await Promise.all([
        reValidator(`/hobby/search`),
        reValidator(`/hobby/monthly/[ym]`, 'page'),
        reValidator(`/hobby/category/[category]/year/[year]`, 'page'),
        reValidator(`/hobby/non-activate/[ym]`, 'page'),
        reValidator(pathName.replace(/\/edit\//, '/detail/')),
      ])

      location.href = `/hobby/category/read/detail/${data?.['createReadLog'].id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.create" category="Read" />
      {/* TODO: ADD book api; naver kakao interpark https://www.nl.go.kr/kolisnet/index.do ... */}
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="1fr 2fr" gap={theme.space['4']}>
          <ReadCreateLeft />
          <ReadCreateRight />
        </Grid>
      </form>
    </>
  )
}

export { ReadCreatePresentation }

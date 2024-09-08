'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { FormEvent } from 'react'
import { DrawCreateLeft } from '@/app/hobby/category/draw/create/(components)/draw.create.left'
import { DrawCreateRight } from '@/app/hobby/category/draw/create/(components)/draw.create.right'
import { Grid, theme } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { logDrawMutation } from '@/gql/domain/draw/draw.mutation.gql'
import { Status, DrawInput, DrawType } from '@/gql/types'

const DrawCreatePresentation = () => {
  const [logDraw] = useMutation(logDrawMutation)

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

    const inp: DrawInput = {
      title: form.get('title') as string,
      content: form.get('content') as string,
      logAtStr: logAt,
      status: form.get('status') as Status,
      thumbnail: (form.get('thumbnail-crop') ?? '') as string,
      mainImage: form.get('mainImage') as string,
      drawType: form.get('drawType') as DrawType,
    }

    const { data, errors } = await logDraw({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.['createDrawLog']?.success) {
      console.error(data?.['createDrawLog']?.message ?? 'something went wrong')
    }

    if (data?.['createDrawLog']?.success) {
      location.href = `/hobby/category/draw/detail/${data?.['createDrawLog'].id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.create" category="Draw" />
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="1fr 2fr" gap={theme.space['4']}>
          <DrawCreateLeft />
          <DrawCreateRight />
        </Grid>
      </form>
    </>
  )
}

export { DrawCreatePresentation }

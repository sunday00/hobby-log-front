'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Grid, Spinner, theme } from '@chakra-ui/react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { FormEvent } from 'react'
import { updateReadMutation } from '@/gql/domain/read/read.mutation.gql'
import { getOneReadQuery } from '@/gql/domain/read/read.query.gql'
import { ReadCreateLeft } from '@/app/hobby/category/read/create/(components)/read.create.left'
import { ReadCreateRight } from '@/app/hobby/category/read/create/(components)/read.create.right'
import { ReadInput, ReadType, Status } from '@/gql/types'

const ReadEditPresentation = ({ id }: { id: string }) => {
  const [updateRead] = useMutation(updateReadMutation)

  const { data, loading, error } = useQuery(getOneReadQuery, {
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
      id,
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

    const { data, errors } = await updateRead({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.updateReadLog.success) {
      console.error(data?.updateReadLog.message ?? 'something went wrong')
    }

    if (data?.updateReadLog.success) {
      location.href = `/hobby/category/read/detail/${data?.updateReadLog.id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.edit" category="Read" />
      <form onSubmit={handleSubmit}>
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <ReadCreateLeft read={data.getOneRead} />
          <ReadCreateRight read={data.getOneRead} />
        </Grid>
      </form>
    </>
  )
}

export { ReadEditPresentation }

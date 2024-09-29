'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Grid, Spinner, theme } from '@chakra-ui/react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { FormEvent } from 'react'
import { updateDrawMutation } from '@/gql/domain/draw/draw.mutation.gql'
import { getOneDrawWithSubImagesQuery } from '@/gql/domain/draw/draw.query.gql'
import { DrawCreateLeft } from '@/app/hobby/category/draw/create/(components)/draw.create.left'
import { DrawCreateRight } from '@/app/hobby/category/draw/create/(components)/draw.create.right'
import { DrawInput, DrawType, Status } from '@/gql/types'
import { SubImageUploader } from '@/app/(global)/(components)/sub-image.uploader'
import { reValidator } from '@/libs/actions'
import { usePathname } from 'next/navigation'

const DrawEditPresentation = ({ id }: { id: string }) => {
  const [updateDraw] = useMutation(updateDrawMutation)
  const pathName = usePathname()

  const { data, loading, error } = useQuery(getOneDrawWithSubImagesQuery, {
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

    const inp: DrawInput = {
      id,
      title: form.get('title') as string,
      content: form.get('content') as string,
      logAtStr: logAt,
      status: form.get('status') as Status,
      thumbnail: (form.get('thumbnail-crop') ?? '') as string,
      mainImage: form.get('mainImage') as string,
      drawType: form.get('drawType') as DrawType,
    }

    const { data, errors } = await updateDraw({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.updateDrawLog.success) {
      console.error(data?.updateDrawLog.message ?? 'something went wrong')
    }

    if (data?.updateDrawLog.success) {
      await reValidator(pathName.replace(/\/edit\//, '/detail/'))
      location.href = `/hobby/category/draw/detail/${data?.updateDrawLog.id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.edit" category="Draw" />
      <form onSubmit={handleSubmit}>
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <DrawCreateLeft draw={data?.getOneDraw} />
          <DrawCreateRight draw={data?.getOneDraw} />
        </Grid>
      </form>
      {data?.getOneDraw && (
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <div></div>
          <SubImageUploader hobby={data?.getOneDraw} />
        </Grid>
      )}
    </>
  )
}

export { DrawEditPresentation }

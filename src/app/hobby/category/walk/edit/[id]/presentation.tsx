'use client'

import { useMutation, useQuery } from '@apollo/client'
import { Grid, Spinner, theme } from '@chakra-ui/react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { FormEvent } from 'react'
import { updateWalkMutation } from '@/gql/domain/walk/walk.mutation.gql'
import { getOneWalkWithSubImagesQuery } from '@/gql/domain/walk/walk.query.gql'
import { WalkCreateLeft } from '@/app/hobby/category/walk/create/(components)/walk.create.left'
import { WalkCreateRight } from '@/app/hobby/category/walk/create/(components)/walk.create.right'
import { Status, WalkInput } from '@/gql/types'
import { SubImageUploader } from '@/app/(global)/(components)/sub-image.uploader'
import { reValidator } from '@/libs/actions'
import { usePathname } from 'next/navigation'

const WalkEditPresentation = ({ id }: { id: string }) => {
  const [updateWalk] = useMutation(updateWalkMutation)
  const pathName = usePathname()

  const { data, loading, error } = useQuery(getOneWalkWithSubImagesQuery, {
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

    const inp: WalkInput = {
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
      steps: Number(form.get('steps') ?? 0),
      duration: Number(form.get('duration') ?? 0),
      distance: Number(form.get('distance') ?? 0),
    }

    const { data, errors } = await updateWalk({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.updateWalkLog.success) {
      console.error(data?.updateWalkLog.message ?? 'something went wrong')
    }

    if (data?.updateWalkLog.success) {
      await reValidator(pathName.replace(/\/edit\//, '/detail/'))
      location.href = `/hobby/category/walk/detail/${data?.updateWalkLog.id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.edit" category="Walk" />
      <form onSubmit={handleSubmit}>
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <WalkCreateLeft walk={data.getOneWalk} />
          <WalkCreateRight walk={data.getOneWalk} />
        </Grid>
      </form>

      {data?.getOneWalk && (
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <div></div>
          <SubImageUploader hobby={data?.getOneWalk} />
        </Grid>
      )}
    </>
  )
}

export { WalkEditPresentation }

'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Grid, theme } from '@chakra-ui/react'
import { GalleryCreateLeft } from '@/app/hobby/category/gallery/create/(components)/gallery.create.left'
import { GalleryCreateRight } from '@/app/hobby/category/gallery/create/(components)/gallery.create.right'
import { FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { logGalleryMutation } from '@/gql/domain/gallery/gallery.mutation.gql'
import { GalleryInput, GalleryType, Status } from '@/gql/types'

const GalleryCreatePresentation = () => {
  const [logGallery] = useMutation(logGalleryMutation)

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

    const inp: GalleryInput = {
      title: form.get('title') as string,
      location: form.get('location') as string,
      overview: form.get('overview') as string,
      content: form.get('content') as string,
      logAtStr: logAt,
      galleryType:
        (form.get('galleryType') as unknown as undefined) ?? GalleryType.Solo,
      status: (form.get('status') as unknown as undefined) ?? Status.Draft,
      ratings: Number(form.get('ratings')),
      thumbnail: form.get('thumbnail') as string,
    }

    const { data, errors } = await logGallery({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.['createGalleryLog']?.success) {
      console.error(
        data?.['createGalleryLog']?.message ?? 'something went wrong',
      )
    }

    if (data?.['createGalleryLog']?.success) {
      location.href = `/hobby/category/gallery/detail/${data?.['createGalleryLog'].id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.create" category="Gallery" />
      <form onSubmit={handleSubmit}>
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <GalleryCreateLeft />
          <GalleryCreateRight />
        </Grid>
      </form>
    </>
  )
}

export { GalleryCreatePresentation }

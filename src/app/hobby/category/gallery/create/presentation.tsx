'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Grid, theme } from '@chakra-ui/react'
import { GalleryCreateLeft } from '@/app/hobby/category/gallery/create/(components)/gallery.create.left'
import { GalleryCreateRight } from '@/app/hobby/category/gallery/create/(components)/gallery.create.right'
import { FormEvent, useContext } from 'react'
import GlobalContext from '@/libs/store.context'
import { useMutation } from '@apollo/client'
import {
  logGalleryMutation,
  updateGalleryMutation,
} from '@/gql/domain/gallery/gallery.mutation.gql'
import { GalleryType, Status } from '@/gql/types'

const GalleryCreatePresentation = () => {
  const global = useContext(GlobalContext)

  const [logGallery] = useMutation(logGalleryMutation)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!global.gallery.galleryInput.galleryType) {
      global.gallery.galleryInput.galleryType =
        GalleryType.Solo as unknown as undefined
    }

    if (!global.gallery.galleryInput.status) {
      global.gallery.galleryInput.status = Status.Draft as unknown as undefined
    }

    if (!global.gallery.galleryInput.ratings) {
      global.gallery.galleryInput.ratings = 75 as unknown as undefined
    }

    const { data, errors } = await logGallery({
      variables: { input: global.gallery.galleryInput },
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

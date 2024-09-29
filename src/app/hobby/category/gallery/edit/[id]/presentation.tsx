'use client'

import { useMutation, useQuery } from '@apollo/client'
import { getOneGalleryWithSubImagesQuery } from '@/gql/domain/gallery/gallery.query.gql'
import { Grid, Spinner, theme } from '@chakra-ui/react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { GalleryCreateLeft } from '@/app/hobby/category/gallery/create/(components)/gallery.create.left'
import { GalleryCreateRight } from '@/app/hobby/category/gallery/create/(components)/gallery.create.right'
import { FormEvent, useContext } from 'react'
import GlobalContext from '@/libs/store.context'
import { updateGalleryMutation } from '@/gql/domain/gallery/gallery.mutation.gql'
import { SubImageUploader } from '@/app/(global)/(components)/sub-image.uploader'
import { GalleryInput, GalleryType, Status } from '@/gql/types'
import { usePathname } from 'next/navigation'
import { reValidator } from '@/libs/actions'

const GalleryEditPresentation = ({ id }: { id: string }) => {
  const global = useContext(GlobalContext)
  const pathName = usePathname()
  const [updateGallery] = useMutation(updateGalleryMutation)

  const { data, loading, error } = useQuery(getOneGalleryWithSubImagesQuery, {
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

  global.gallery.input = data.getOneGallery

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
      id,
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

    const { data, errors } = await updateGallery({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.updateGalleryLog.success) {
      console.error(data?.updateGalleryLog.message ?? 'something went wrong')
    }

    if (data?.updateGalleryLog.success) {
      await reValidator(pathName.replace(/\/edit\//, '/detail/'))
      location.href = `/hobby/category/gallery/detail/${data?.updateGalleryLog.id}`
    }
  }

  return (
    <>
      <BreadcrumbWarp name="category.edit" category="Gallery" />
      <form onSubmit={handleSubmit}>
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <GalleryCreateLeft gallery={data.getOneGallery} />
          <GalleryCreateRight gallery={data.getOneGallery} />
        </Grid>
      </form>

      {data?.getOneGallery && (
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <div></div>
          <SubImageUploader hobby={data?.getOneGallery} />
        </Grid>
      )}
    </>
  )
}

export { GalleryEditPresentation }

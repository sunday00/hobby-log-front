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

const GalleryEditPresentation = ({ id }: { id: string }) => {
  const global = useContext(GlobalContext)
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

    const {
      userId: _userId,
      category: _category,
      logAt: _logAt,
      __typename: ___typename,
      ...inp
    } = {
      ...global.gallery.input,
      userId: '',
      category: '',
      logAt: '',
      __typename: 'Gallery Edit',
    }

    delete inp['subImages']

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

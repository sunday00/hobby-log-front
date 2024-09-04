'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Grid, theme } from '@chakra-ui/react'
import { GalleryCreateLeft } from '@/app/hobby/category/gallery/create/(components)/gallery.create.left'
import { GalleryCreateRight } from '@/app/hobby/category/gallery/create/(components)/gallery.create.right'

const GalleryCreatePresentation = () => {
  return (
    <>
      <BreadcrumbWarp name="category.create" category="Gallery" />
      <form>
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

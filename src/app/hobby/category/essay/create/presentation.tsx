'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Grid, theme } from '@chakra-ui/react'
import { EssayCreateLeft } from '@/app/hobby/category/essay/create/(components)/essay.create.left'
import { EssayCreateRight } from '@/app/hobby/category/essay/create/(components)/essay.create.right'
import { FormEvent } from 'react'

const EssayCreatePresentation = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <>
      <BreadcrumbWarp name="category.create" category="Essay" />
      <form>
        <Grid
          mt={theme.space['4']}
          gap={theme.space['4']}
          templateColumns="1fr 2fr"
        >
          <EssayCreateLeft />
          <EssayCreateRight />
        </Grid>
      </form>
    </>
  )
}

export { EssayCreatePresentation }

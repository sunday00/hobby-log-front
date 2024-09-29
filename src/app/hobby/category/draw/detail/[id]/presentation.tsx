'use client'

import { Draw } from '@/gql/types'
import { ReactNode } from 'react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { dateFormat } from '@/libs/conv.util'
import { Box } from '@chakra-ui/react'
import { FilterActiveMy } from '@/app/(global)/(components)/detail-user-controle/filter.active.my'

const DrawDetailPresentation = ({
  children,
  draw,
}: {
  children: ReactNode
  draw: Draw
}) => {
  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Draw"
        dddd={dateFormat(draw?.logAt ?? new Date().toISOString(), 'YYYY-MM')}
      />
      <Box maxW="6xl" mx="auto">
        <FilterActiveMy content={draw}>{children}</FilterActiveMy>
      </Box>
    </>
  )
}

export { DrawDetailPresentation }

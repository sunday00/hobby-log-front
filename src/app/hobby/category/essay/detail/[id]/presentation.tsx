'use client'

import { ReactNode } from 'react'
import { dateFormat } from '@/libs/conv.util'
import { Essay } from '@/gql/types'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Box } from '@chakra-ui/react'
import { FilterActiveMy } from '@/app/(global)/(components)/detail-user-controle/filter.active.my'

const EssayDetailPresentation = ({
  children,
  essay,
}: {
  children: ReactNode
  essay: Essay
}) => {
  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Essay"
        dddd={dateFormat(essay?.logAt ?? new Date().toISOString(), 'YYYY-MM')}
      />
      <Box maxW="6xl" mx="auto">
        <FilterActiveMy content={essay}>{children}</FilterActiveMy>
      </Box>
    </>
  )
}

export { EssayDetailPresentation }

'use client'

import { Walk } from '@/gql/types'
import { ReactNode } from 'react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { dateFormat } from '@/libs/conv.util'
import { FilterActiveMy } from '@/app/(global)/(components)/detail-user-controle/filter.active.my'

const WalkDetailPresentation = ({
  children,
  walk,
}: {
  children: ReactNode
  walk: Walk
}) => {
  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Walk"
        dddd={dateFormat(walk?.logAt ?? new Date().toISOString(), 'YYYY-MM')}
      />
      <FilterActiveMy content={walk}>{children}</FilterActiveMy>
    </>
  )
}

export { WalkDetailPresentation }

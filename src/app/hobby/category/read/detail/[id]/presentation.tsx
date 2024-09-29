'use client'

import { Read } from '@/gql/types'
import { ReactNode } from 'react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { dateFormat } from '@/libs/conv.util'
import { FilterActiveMy } from '@/app/(global)/(components)/detail-user-controle/filter.active.my'

const ReadDetailPresentation = ({
  children,
  read,
}: {
  children: ReactNode
  read: Read
}) => {
  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Read"
        dddd={dateFormat(read?.logAt ?? new Date().toISOString(), 'YYYY-MM')}
      />
      <FilterActiveMy content={read}>{children}</FilterActiveMy>
    </>
  )
}

export { ReadDetailPresentation }

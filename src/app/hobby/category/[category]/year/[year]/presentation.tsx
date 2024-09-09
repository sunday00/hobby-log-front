'use client'

import { Category, Hobby } from '@/gql/types'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { MonthlyItemWarp } from '@/app/hobby/monthly/[ym]/(components)/monthly.item.warp'
import { MonthlyItem } from '@/app/hobby/monthly/[ym]/(components)/monthly.item'
import { Stack, theme } from '@chakra-ui/react'
import { YearlyNavControl } from '@/app/hobby/category/[category]/year/[year]/(components)/nav.control'

const YearlyPresentation = ({
  hobbies,
  year,
  category,
}: {
  hobbies: Hobby[]
  year: string
  category: Category
}) => {
  const elementList = hobbies.map((hobby, i) => {
    return (
      <MonthlyItemWarp key={hobby.id} justify={i % 2 === 0 ? 'start' : 'end'}>
        <MonthlyItem hobby={hobby} />
      </MonthlyItemWarp>
    )
  })

  return (
    <>
      <BreadcrumbWarp name="yearly" category={category} dddd={year} />
      <YearlyNavControl yyyy={year} category={category} />
      <Stack mt={theme.space['4']} alignItems="center">
        {elementList}
      </Stack>
    </>
  )
}

export { YearlyPresentation }

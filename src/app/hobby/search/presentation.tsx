'use client'

import { Category, Hobby } from '@/gql/types'
import { MonthlyItemWarp } from '@/app/hobby/monthly/[ym]/(components)/monthly.item.warp'
import { MonthlyItem } from '@/app/hobby/monthly/[ym]/(components)/monthly.item'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Stack, theme } from '@chakra-ui/react'
import { SearchNavControl } from '@/app/hobby/search/(components)/nav.control'

const HobbySearchPresentation = ({
  hobbiesPage,
  search,
  page,
  category,
}: {
  hobbiesPage: { totalCount: number; hobbies: Hobby[] }
  search: string
  page: string
  category?: Category
}) => {
  const elementList = hobbiesPage?.hobbies.map((hobby, i) => {
    return (
      <MonthlyItemWarp key={hobby.id} justify={i % 2 === 0 ? 'start' : 'end'}>
        <MonthlyItem hobby={hobby} />
      </MonthlyItemWarp>
    )
  })

  return (
    <>
      <BreadcrumbWarp name="search" />
      <SearchNavControl
        search={search}
        totalCount={hobbiesPage?.totalCount}
        page={Number(page)}
        category={category}
      />
      <Stack mt={theme.space['4']} alignItems="center">
        {elementList}
      </Stack>
    </>
  )
}

export { HobbySearchPresentation }

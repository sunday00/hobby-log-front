'use client'

import { Hobby } from '@/gql/types'
import { MonthlyItemWarp } from '@/app/hobby/monthly/[ym]/(components)/monthly.item.warp'
import { MonthlyItem } from '@/app/hobby/monthly/[ym]/(components)/monthly.item'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Stack, theme } from '@chakra-ui/react'
import { SearchNavControl } from '@/app/hobby/search/(components)/nav.control'

const HobbySearchPresentation = ({
  hobbies,
  search,
  page,
}: {
  hobbies: Hobby[]
  search: string
  page: string
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
      <BreadcrumbWarp name="search" />
      <SearchNavControl search={search} page={Number(page)} />
      <Stack mt={theme.space['4']} alignItems="center">
        {elementList}
      </Stack>
    </>
  )
}

export { HobbySearchPresentation }

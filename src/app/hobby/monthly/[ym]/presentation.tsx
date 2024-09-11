'use client'

import { Hobby } from '@/gql/types'
import { Stack, theme } from '@chakra-ui/react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { MonthlyItem } from '@/app/hobby/monthly/[ym]/(components)/monthly.item'
import { MonthlyNavControl } from '@/app/hobby/monthly/[ym]/(components)/nav.control'
import { MonthlyItemWarp } from '@/app/hobby/monthly/[ym]/(components)/monthly.item.warp'

const HobbyMonthlyPresentation = ({
  hobbies,
  ym,
}: {
  hobbies: Hobby[]
  ym?: string
}) => {
  const today = new Date()
  const [yyyy, mm] = ym
    ? ym.split('-')
    : [
        today.getFullYear().toString(),
        (today.getMonth() + 1).toString().padStart(2, '0'),
      ]

  const elementList = hobbies?.map((hobby, i) => {
    return (
      <MonthlyItemWarp key={hobby.id} justify={i % 2 === 0 ? 'start' : 'end'}>
        <MonthlyItem hobby={hobby} />
      </MonthlyItemWarp>
    )
  })

  return (
    <>
      <BreadcrumbWarp name="monthly" dddd={ym} />
      <MonthlyNavControl yyyy={yyyy} mm={mm} />
      <Stack mt={theme.space['4']} alignItems="center">
        {elementList}
      </Stack>
    </>
  )
}

export { HobbyMonthlyPresentation }

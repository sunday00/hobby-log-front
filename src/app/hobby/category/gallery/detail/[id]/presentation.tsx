'use client'

import { ReactNode } from 'react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { dateFormat } from '@/libs/conv.util'
import { Box, theme } from '@chakra-ui/react'
import { Status } from '@/gql/types'
import { ControlDetail } from '@/app/(global)/(components)/detail-user-controle/control.detail'
import NotFound from 'next/dist/client/components/not-found-error'
import { useMy } from '@/app/(global)/(hooks)/useMy.hook'

const GalleryDetailPresentation = ({
  children,
  logAt,
  userId,
  status,
}: {
  children: ReactNode
  logAt: string
  userId: string
  status: Status
}) => {
  const my = useMy(userId)

  return status !== Status.Active && !my ? (
    <Box overflow={'hidden'} h={'80vh'}>
      <NotFound />
    </Box>
  ) : (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Gallery"
        dddd={dateFormat(logAt, 'YYYY-MM')}
      />
      <Box maxW="6xl" mx="auto">
        <Box mt={theme.space['8']}>{children}</Box>
        <ControlDetail my={my} status={status} />
      </Box>
    </>
  )
}

export { GalleryDetailPresentation }

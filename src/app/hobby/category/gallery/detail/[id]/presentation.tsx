'use client'

import { ReactNode, useEffect, useState } from 'react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { dateFormat, decodeBase64 } from '@/libs/conv.util'
import { Box, theme } from '@chakra-ui/react'
import { LocalStorage } from '@/libs/localStorage.safely.util'
import { GalleryDetailUserButton } from '@/app/hobby/category/gallery/detail/[id]/(components)/gallery.detail.user'
import { Status } from '@/gql/types'

const GalleryDetailPresentation = ({
  children,
  id,
  logAt,
  userId,
  status,
}: {
  children: ReactNode
  id: string
  logAt: string
  userId: string
  status: Status
}) => {
  const [my, setMy] = useState(false)

  useEffect(() => {
    const at = LocalStorage.getItem('accessToken')

    if (!at || at === '') {
      setMy(false)
      return
    }

    const { sub } = decodeBase64(at ?? '.')

    setMy(sub === userId)
  }, [userId])

  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Gallery"
        dddd={dateFormat(logAt, 'YYYY-MM')}
      />
      <Box maxW="6xl" mx="auto">
        <Box mt={theme.space['8']}>{children}</Box>
        {my && <GalleryDetailUserButton id={id} status={status} />}
      </Box>
    </>
  )
}

export { GalleryDetailPresentation }

'use client'

import { Read } from '@/gql/types'
import { ReactNode, useEffect, useState } from 'react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { dateFormat, decodeBase64 } from '@/libs/conv.util'
import { Box, theme } from '@chakra-ui/react'
import { LocalStorage } from '@/libs/localStorage.safely.util'
import { ReadDetailUserButton } from '@/app/hobby/category/read/detail/[id]/(components)/read.detail.user'

const ReadDetailPresentation = ({
  children,
  read,
}: {
  children: ReactNode
  read: Read
}) => {
  const [my, setMy] = useState(false)

  useEffect(() => {
    const at = LocalStorage.getItem('accessToken')

    if (!at || at === '') {
      setMy(false)
      return
    }

    const { sub } = decodeBase64(at ?? '.')

    setMy(sub === read?.userId)
  }, [read?.userId])

  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Read"
        dddd={dateFormat(read?.logAt ?? new Date().toISOString(), 'YYYY-MM')}
      />
      <Box maxW="6xl" mx="auto">
        <Box mt={theme.space['8']}>{children}</Box>
        {my && <ReadDetailUserButton read={read} />}
      </Box>
    </>
  )
}

export { ReadDetailPresentation }

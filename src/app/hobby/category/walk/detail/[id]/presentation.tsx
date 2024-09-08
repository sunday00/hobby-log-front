'use client'

import { Walk } from '@/gql/types'
import { ReactNode, useEffect, useState } from 'react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { dateFormat, decodeBase64 } from '@/libs/conv.util'
import { Box, theme } from '@chakra-ui/react'
import { LocalStorage } from '@/libs/localStorage.safely.util'
import { WalkDetailUserButton } from '@/app/hobby/category/walk/detail/[id]/(components)/walk.detail.user'

const WalkDetailPresentation = ({
  children,
  walk,
}: {
  children: ReactNode
  walk: Walk
}) => {
  const [my, setMy] = useState(false)

  useEffect(() => {
    const at = LocalStorage.getItem('accessToken')

    if (!at || at === '') {
      setMy(false)
      return
    }

    const { sub } = decodeBase64(at ?? '.')

    setMy(sub === walk?.userId)
  }, [walk?.userId])

  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Walk"
        dddd={dateFormat(walk?.logAt ?? new Date().toISOString(), 'YYYY-MM')}
      />
      <Box maxW="8xl" mx="auto">
        <Box mt={theme.space['8']}>{children}</Box>
        {my && <WalkDetailUserButton walk={walk} />}
      </Box>
    </>
  )
}

export { WalkDetailPresentation }

'use client'

import { Draw } from '@/gql/types'
import { ReactNode, useEffect, useState } from 'react'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { dateFormat, decodeBase64 } from '@/libs/conv.util'
import { Box, theme } from '@chakra-ui/react'
import { LocalStorage } from '@/libs/localStorage.safely.util'
import { DrawDetailUserButton } from '@/app/hobby/category/draw/detail/[id]/(components)/draw.detail.user'

const DrawDetailPresentation = ({
  children,
  draw,
}: {
  children: ReactNode
  draw: Draw
}) => {
  const [my, setMy] = useState(false)

  useEffect(() => {
    const at = LocalStorage.getItem('accessToken')

    if (!at || at === '') {
      setMy(false)
      return
    }

    const { sub } = decodeBase64(at ?? '.')

    setMy(sub === draw?.userId)
  }, [draw?.userId])

  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Draw"
        dddd={dateFormat(draw?.logAt ?? new Date().toISOString(), 'YYYY-MM')}
      />
      <Box maxW="6xl" mx="auto">
        <Box mt={theme.space['8']}>{children}</Box>
        {my && <DrawDetailUserButton draw={draw} />}
      </Box>
    </>
  )
}

export { DrawDetailPresentation }

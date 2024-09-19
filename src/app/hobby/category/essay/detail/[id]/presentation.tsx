'use client'

import { ReactNode, useEffect, useState } from 'react'
import { LocalStorage } from '@/libs/localStorage.safely.util'
import { dateFormat, decodeBase64 } from '@/libs/conv.util'
import { Essay } from '@/gql/types'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { Box, theme } from '@chakra-ui/react'
import { EssayDetailUserButton } from '@/app/hobby/category/essay/detail/[id]/(components)/essay.detail.user'

const EssayDetailPresentation = ({
  children,
  essay,
}: {
  children: ReactNode
  essay: Essay
}) => {
  const [my, setMy] = useState(false)

  useEffect(() => {
    const at = LocalStorage.getItem('accessToken')

    if (!at || at === '') {
      setMy(false)
      return
    }

    const { sub } = decodeBase64(at ?? '.')

    setMy(sub === essay?.userId)
  }, [essay?.userId])

  return (
    <>
      <BreadcrumbWarp
        name="category.detail"
        category="Essay"
        dddd={dateFormat(essay?.logAt ?? new Date().toISOString(), 'YYYY-MM')}
      />
      <Box maxW="6xl" mx="auto">
        <Box mt={theme.space['8']}>{children}</Box>
        {my && <EssayDetailUserButton essay={essay} />}
      </Box>
    </>
  )
}

export { EssayDetailPresentation }

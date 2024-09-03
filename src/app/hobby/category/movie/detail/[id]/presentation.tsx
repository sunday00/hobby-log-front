'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { ReactNode, useEffect, useState } from 'react'
import { Box, theme } from '@chakra-ui/react'
import { dateFormat, decodeBase64 } from '@/libs/conv.util'
import { MovieDetailUserButton } from '@/app/hobby/category/movie/detail/[id]/(components)/movie.detail.user'
import { LocalStorage } from '@/libs/localStorage.safely.util'
import { Status } from '@/gql/types'

const MovieDetailPresentation = ({
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
        category="Movie"
        dddd={dateFormat(logAt, 'YYYY-MM')}
      />
      <Box mt={theme.space['8']}>{children}</Box>
      {my && <MovieDetailUserButton id={id} status={status} />}
    </>
  )
}

export { MovieDetailPresentation }

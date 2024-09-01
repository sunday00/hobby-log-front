'use client'

import { Flex, theme } from '@chakra-ui/react'
import { Category } from '@/gql/types'
import Link from 'next/link'
import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'

const HobbyCreatePage = () => {
  const categories = Object.keys(Category)
  const list = categories.map((c) => {
    return (
      <li
        key={c}
        style={{ marginBottom: theme.space['4'], textAlign: 'center' }}
      >
        <Link href={`/hobby/category/${c.toLowerCase()}/create`}>{c}</Link>
      </li>
    )
  })

  return (
    <>
      <BreadcrumbWarp name="create" />
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        h="85vh"
      >
        <ul>{list}</ul>
      </Flex>
    </>
  )
}

export default HobbyCreatePage

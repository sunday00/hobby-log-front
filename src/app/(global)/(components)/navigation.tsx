import { Box, Flex, theme } from '@chakra-ui/react'
import Link from 'next/link'
import { LoginButton } from '@/app/(global)/(components)/login.button'

export const Navigation = () => {
  return (
    <Flex as="nav" p={theme.space['2']} justify="space-between">
      <h1>
        <a href={process.env.NEXT_PUBLIC_FRONT_HOST}>HobbyLog</a>
      </h1>
      <Flex
        justify="space-evenly"
        alignItems="center"
        fontSize={theme.fontSizes.sm}
        gap={theme.space['4']}
      >
        <Box as={Link} href="/monthly">
          <p>Monthly</p>
        </Box>

        <Box as={Link} href="/category">
          <p>Category</p>
        </Box>

        <LoginButton />
      </Flex>
    </Flex>
  )
}

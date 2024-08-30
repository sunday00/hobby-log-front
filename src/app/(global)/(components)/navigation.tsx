import { Box, Flex, theme } from '@chakra-ui/react'
import Link from 'next/link'

export const Navigation = () => {
  return (
    <Flex p={theme.space['2']} justify="space-between">
      <h1>
        <a href={process.env.NEXT_PUBLIC_FRONT_HOST}>HobbyLog</a>
      </h1>
      <Flex
        as="ul"
        justify="space-evenly"
        fontSize={theme.fontSizes.sm}
        gap={theme.space['4']}
      >
        <li>
          <Box as={Link} href="/monthly">
            <p>Monthly</p>
          </Box>
        </li>
        <li>
          <Box as={Link} href="/category">
            <p>Category</p>
          </Box>
        </li>
        <li>
          <Box as={Link} href="/auth">
            <p>Login</p>
          </Box>
        </li>
      </Flex>
    </Flex>
  )
}

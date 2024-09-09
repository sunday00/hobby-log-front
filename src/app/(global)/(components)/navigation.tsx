import { Box, Flex, theme } from '@chakra-ui/react'
import Link from 'next/link'
import { LoginButton } from '@/app/(global)/(components)/login.button'
import { DarkModeButton } from '@/app/(global)/(components)/darkmode.button'
import { CategoryButton } from '@/app/(global)/(components)/category.button'

export const Navigation = () => {
  const today = new Date()
  const ym =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0')

  return (
    <Flex
      as="nav"
      p={theme.space['2']}
      justify="space-between"
      alignItems="center"
      h="60px"
    >
      <h1>
        <a href={process.env.NEXT_PUBLIC_FRONT_HOST}>HobbyLog</a>
      </h1>
      <Flex
        justify="space-evenly"
        alignItems="center"
        fontSize={theme.fontSizes.sm}
        gap={theme.space['4']}
      >
        <Box as={Link} href={`/hobby/monthly/${ym}`}>
          <p>Monthly</p>
        </Box>

        <CategoryButton />

        <Box as={Link} href={`/hobby/search`}>
          <p>search</p>
        </Box>

        <LoginButton />

        <DarkModeButton />
      </Flex>
    </Flex>
  )
}

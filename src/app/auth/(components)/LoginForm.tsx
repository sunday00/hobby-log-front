'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  theme,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import Link from 'next/link'

export const LoginForm = ({ url }: { url: string }) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Login via Kakao</FormLabel>
              <Button
                as={Link}
                href={url}
                w="100%"
                bg={theme.colors.yellow['400']}
              >
                <Box color={theme.colors.black}>Login</Box>
              </Button>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

import { Category, Hobby } from '@/gql/types'
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  theme,
  useColorModeValue,
} from '@chakra-ui/react'
import { categoryToEmoji } from '@/libs/conv.util'
import { BsArrowUpRight } from 'react-icons/bs'
import Link from 'next/link'

const MonthlyItem = ({ hobby }: { hobby: Hobby }) => {
  const today = new Date()

  return (
    <Grid
      w="75%"
      maxW="750px"
      rounded={'sm'}
      my={5}
      mx={[0, 5]}
      overflow={'hidden'}
      bg="white"
      border={'1px'}
      borderColor="black"
      boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 white')}
      gridTemplateColumns="200px 1fr"
    >
      <Box
        className="monthly-left"
        h={'230px'}
        borderBottom={'1px'}
        borderColor="black"
      >
        <Image
          src={`${process.env['NEXT_PUBLIC_BACKEND_HOST']}${hobby.thumbnail}`}
          fallbackSrc={`${process.env['NEXT_PUBLIC_BACKEND_HOST']}/images/default/${hobby.category?.toLowerCase()}-default.jpeg`}
          roundedTop={'sm'}
          objectFit="cover"
          h="full"
          w="full"
          alt={'Blog Image'}
        />
      </Box>

      <Box className="monthly-right">
        <Box p={4}>
          <Box
            bg="white"
            display={'inline-block'}
            px={4}
            py={2}
            color="black"
            mb={2}
            border={'1px solid'}
          >
            <Link
              href={`/hobby/category/${hobby.category?.toLowerCase()}/year/${today.getFullYear()}`}
            >
              <Text fontSize={'xs'} fontWeight="medium">
                {categoryToEmoji(hobby.category!)} | {hobby.category}
              </Text>
            </Link>
          </Box>
          <Heading color={'black'} mt={'1em'} fontSize={'2xl'} noOfLines={1}>
            {hobby.title}
          </Heading>
          <Text
            color={'gray.500'}
            noOfLines={2}
            mt={theme.space['2']}
            minW="600px"
            minH={'2em'}
          >
            {hobby.logAt.replace('T', ' ')}
          </Text>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            cursor={'pointer'}
            w="full"
          >
            <Link
              href={`/hobby/category/${hobby.category?.toLowerCase()}/detail/${hobby.id}`}
            >
              <Flex gap={theme.space['8']} alignItems="center">
                <Text fontSize={'md'} fontWeight={'semibold'}>
                  read detail
                </Text>
                <BsArrowUpRight />
              </Flex>
            </Link>
          </Flex>
        </HStack>
      </Box>
    </Grid>
  )
}

export { MonthlyItem }

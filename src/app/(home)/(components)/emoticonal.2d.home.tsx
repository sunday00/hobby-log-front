import { Box, Flex, Stack, theme, useColorModeValue } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaFilm, FaUser } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { Category } from '@/gql/types'
import { Emoticon } from '@/app/(home)/(components)/emoticon'
import Link from 'next/link'

const Emoticonal2dHome = () => {
  const [category, setCategory] = useState(Category.Movie)
  const [idx, setIdx] = useState(0)
  const keys = Object.keys(Category)

  const today = new Date()
  const ym =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0')

  useEffect(() => {
    const itv = setInterval(() => {
      setIdx(idx >= keys.length - 1 ? 0 : idx + 1)
      setCategory(Category[keys[idx] as keyof typeof Category])
    }, 600)

    return () => clearInterval(itv)
  }, [keys, idx])

  return (
    <Flex
      w={'90vw'}
      h={'85vh'}
      justifyContent="center"
      alignItems="center"
      mx={'auto'}
    >
      <Stack justifyContent={'center'}>
        <Flex alignItems={'center'} flexDirection="column" mb={theme.space[4]}>
          <Flex
            w={'10em'}
            h={'6em'}
            p={theme.space[2]}
            bg={useColorModeValue('white', 'black')}
            border={'2px solid'}
            borderRadius={theme.radii.md}
            borderColor={useColorModeValue('black', 'white')}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Emoticon category={category} />
          </Flex>
          <Box
            className="deco"
            mt={'-1em'}
            w={'1.5em'}
            h={'1.5em'}
            bg={useColorModeValue('white', 'black')}
            transform={'rotate(45deg)'}
            borderStyle={'solid'}
            borderWidth={'0 2px 2px 0'}
            borderColor={useColorModeValue('black', 'white')}
          />
        </Flex>

        <Flex justifyContent={'center'}>
          <Icon as={FaUser} fontSize={'2em'} />
        </Flex>

        <Flex>
          <Link
            href={`/hobby/monthly/${ym}`}
            style={{ textDecoration: 'underline' }}
          >
            &gt;&gt; See weekly Emotional activity
          </Link>
        </Flex>
      </Stack>
    </Flex>
  )
}

export { Emoticonal2dHome }

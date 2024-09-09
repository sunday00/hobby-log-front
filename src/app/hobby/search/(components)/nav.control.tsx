import { FormEvent, MouseEvent, useState } from 'react'
import { Box, Button, Flex, FormControl, theme } from '@chakra-ui/react'
import Link from 'next/link'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Icon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const SearchNavControl = ({
  search,
  page = 1,
}: {
  search: string
  page: number
}) => {
  const publicUrl = `/hobby/search/`

  const [currentSearch, setCurrentSearch] = useState(search)
  const [currentPage, setCurrentPage] = useState(page)

  const router = useRouter()

  const moveToRelative = (
    e: MouseEvent<HTMLButtonElement>,
    targetPage: number,
  ) => {
    e.preventDefault()

    setCurrentPage(targetPage)
    router.push(`${publicUrl}?search=${currentSearch}&page=${targetPage}`)
  }

  const moveToSpecific = (e: FormEvent) => {
    e.preventDefault()

    router.push(`${publicUrl}?search=${currentSearch}&page=${currentPage}`)
  }

  return (
    <Box display="flex" justifyContent="center">
      <Flex>
        <Button
          as={Link}
          href={`${publicUrl}?search=${currentSearch}&page=${currentPage - 1}`}
          aria-label={'prev page'}
          isDisabled={currentPage <= 1}
          onClick={(e) => moveToRelative(e, currentPage - 1)}
        >
          <Icon as={FaAngleLeft} />
        </Button>

        <Box mx={theme.space['4']}>
          <form onSubmit={moveToSpecific}>
            <FormControl as={Flex} gap={theme.space['1']}>
              <Input
                w="240px"
                type="text"
                value={currentSearch}
                onChange={(e) => setCurrentSearch(e.target.value)}
              />

              <Input
                w="120px"
                type="number"
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
              />

              <Button type="submit">
                <FaSearch />
              </Button>
            </FormControl>
          </form>
        </Box>

        <Button
          as={Link}
          href={`${publicUrl}?search=${currentSearch}&page=${currentPage + 1}`}
          aria-label={'go to next page'}
          // isDisabled={year >= today.getFullYear()}
          onClick={(e) => moveToRelative(e, currentPage + 1)}
        >
          <Icon as={FaAngleRight} />
        </Button>
      </Flex>
    </Box>
  )
}

export { SearchNavControl }

import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { Box, Button, Flex, FormControl, Select, theme } from '@chakra-ui/react'
import Link from 'next/link'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Icon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { Category } from '@/gql/types'

const SearchNavControl = ({
  search,
  totalCount,
  page = 1,
  category,
}: {
  search: string
  totalCount: number
  page: number
  category?: Category
}) => {
  const publicUrl = `/hobby/search/`

  const [currentCategory, setCurrentCategory] = useState<string>(
    category?.toString().toLowerCase() ?? '',
  )
  const [currentSearch, setCurrentSearch] = useState(search)
  const [currentPage, setCurrentPage] = useState(page)

  const router = useRouter()

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value.toLowerCase())
  }

  const categoryOptions = Object.keys(Category).map((key) => {
    return (
      <option key={key} value={key.toLowerCase()}>
        {key}
      </option>
    )
  })

  const moveToRelative = (
    e: MouseEvent<HTMLButtonElement>,
    targetPage: number,
  ) => {
    e.preventDefault()

    setCurrentPage(targetPage)
    router.push(
      `${publicUrl}?search=${currentSearch}&page=${targetPage}&category=${currentCategory}`,
    )
  }

  const moveToSpecific = (e: FormEvent) => {
    e.preventDefault()

    router.push(
      `${publicUrl}?search=${currentSearch}&page=${currentPage}&category=${currentCategory}`,
    )
  }

  return (
    <Box display="flex" justifyContent="center">
      <Flex>
        <Button
          as={Link}
          href={`${publicUrl}?search=${currentSearch}&page=${currentPage - 1}&category=${currentCategory}`}
          aria-label={'prev page'}
          isDisabled={currentPage <= 1}
          onClick={(e) => moveToRelative(e, currentPage - 1)}
        >
          <Icon as={FaAngleLeft} />
        </Button>

        <Box mx={theme.space['4']}>
          <form onSubmit={moveToSpecific}>
            <FormControl as={Flex} gap={theme.space['1']}>
              <Select
                name="category"
                w="200px"
                value={currentCategory}
                onChange={handleChangeCategory}
              >
                <option value={''}>Category</option>
                {categoryOptions}
              </Select>

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
          href={`${publicUrl}?search=${currentSearch}&page=${currentPage + 1}&category=${currentCategory}`}
          aria-label={'go to next page'}
          isDisabled={page >= Math.ceil(totalCount / 20)}
          onClick={(e) => moveToRelative(e, currentPage + 1)}
        >
          <Icon as={FaAngleRight} />
        </Button>
      </Flex>
    </Box>
  )
}

export { SearchNavControl }

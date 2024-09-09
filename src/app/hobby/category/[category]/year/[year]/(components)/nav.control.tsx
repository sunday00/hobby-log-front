import { FormEvent, useState } from 'react'
import { Box, Button, Flex, FormControl, theme } from '@chakra-ui/react'
import Link from 'next/link'
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6'
import { Icon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { Category } from '@/gql/types'

const YearlyNavControl = ({
  yyyy,
  category,
}: {
  yyyy: string
  category: Category
}) => {
  const today = new Date()
  const publicUrl = `/hobby/category/${category.toLowerCase()}/year`
  const year = Number(yyyy)

  const [currentYear, setCurrentYear] = useState(year)

  const router = useRouter()

  const moveToSpecific = (e: FormEvent) => {
    e.preventDefault()

    router.push(`${publicUrl}/${currentYear}`)
  }

  return (
    <Box display="flex" justifyContent="center">
      <Flex>
        <Button
          as={Link}
          href={`${publicUrl}/${year - 1}`}
          aria-label={'go to one year ago'}
          isDisabled={year <= 2024}
        >
          <Icon as={FaAnglesLeft} />
        </Button>

        <Box mx={theme.space['4']}>
          <form onSubmit={moveToSpecific}>
            <FormControl as={Flex}>
              <Input
                w="120px"
                type="number"
                min="2024"
                max={today.getFullYear()}
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
              />
              <Button type="submit">
                <FaSearch />
              </Button>
            </FormControl>
          </form>
        </Box>

        <Button
          as={Link}
          href={`${publicUrl}/${year + 1}`}
          aria-label={'go to one year ago'}
          isDisabled={year >= today.getFullYear()}
        >
          <Icon as={FaAnglesRight} />
        </Button>
      </Flex>
    </Box>
  )
}

export { YearlyNavControl }

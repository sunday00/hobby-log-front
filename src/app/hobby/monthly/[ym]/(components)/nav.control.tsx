import { FormEvent, useState } from 'react'
import { Box, Button, Flex, FormControl, theme } from '@chakra-ui/react'
import Link from 'next/link'
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from 'react-icons/fa6'
import { Icon } from '@chakra-ui/icons'
import { calcOneMonth } from '@/libs/conv.util'
import { Input } from '@chakra-ui/input'
import { FaSearch } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const MonthlyNavControl = ({ yyyy, mm }: { yyyy: string; mm: string }) => {
  const today = new Date()
  const year = Number(yyyy)
  const month = Number(mm)
  const [currentYear, setCurrentYear] = useState(year)
  const [currentMonth, setCurrentMonth] = useState(month)

  const router = useRouter()

  const moveToSpecific = (e: FormEvent) => {
    e.preventDefault()

    router.push(
      `/hobby/monthly/${currentYear}-${currentMonth.toString().padStart(2, '0')}`,
    )
  }

  return (
    <Box display="flex" justifyContent="center">
      <Flex>
        <Button
          as={Link}
          href={`/hobby/monthly/${year - 1}-${mm}`}
          aria-label={'go to one year ago'}
          isDisabled={year <= 2024}
        >
          <Icon as={FaAnglesLeft} />
        </Button>
        <Button
          as={Link}
          href={`/hobby/monthly/${calcOneMonth(year, month, 'prev').join('-')}`}
          aria-label={'go to one month ago'}
          isDisabled={year < 2023 || (year === 2024 && month <= 7)}
        >
          <Icon as={FaAngleLeft} />
        </Button>

        <Box mx={theme.space['4']}>
          <form onSubmit={moveToSpecific}>
            <FormControl as={Flex}>
              <Input
                w="120px"
                type="number"
                min="2024"
                max="2200"
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
              />

              <Input
                w="80px"
                type="number"
                min="1"
                max="12"
                value={currentMonth}
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
              />

              <Button type="submit">
                <FaSearch />
              </Button>
            </FormControl>
          </form>
        </Box>

        <Button
          as={Link}
          href={`/hobby/monthly/${calcOneMonth(year, month, 'next').join('-')}`}
          aria-label={'go to one year ago'}
          isDisabled={
            year >= today.getFullYear() && month >= today.getMonth() + 1
          }
        >
          <Icon as={FaAngleRight} />
        </Button>
        <Button
          as={Link}
          href={`/hobby/monthly/${year + 1}-${mm}`}
          aria-label={'go to one year ago'}
          isDisabled={
            year >= today.getFullYear() ||
            (year + 1 >= today.getFullYear() && month >= today.getMonth() + 1)
          }
        >
          <Icon as={FaAnglesRight} />
        </Button>
      </Flex>
    </Box>
  )
}

export { MonthlyNavControl }

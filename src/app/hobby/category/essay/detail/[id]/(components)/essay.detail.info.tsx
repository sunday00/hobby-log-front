'use client'

import { Category, Essay, Series } from '@/gql/types'
import {
  Flex,
  Heading,
  Image,
  Select,
  Stack,
  Text,
  theme,
} from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'

const EssayDetailInfo = ({ essay }: { essay: Essay }) => {
  const router = useRouter()

  const seriesOption = (essay?.series as Series[])?.map((series: Series) => {
    return (
      <option key={series.id} value={series.id ?? ''}>
        {series.title}
      </option>
    )
  })

  const handleSeriesMove = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    const seriesId = e.target.value
    return router.push(`/hobby/category/essay/detail/${seriesId}`)
  }

  return (
    <Stack>
      <Flex
        className="detail-info-header"
        justifyContent="space-between"
        gap={theme.space['2']}
      >
        <Flex gap={theme.space['4']} alignItems="center">
          <Heading as={'h4'} fontSize={theme.fontSizes.lg}>
            [{essay.writingType}]
          </Heading>
          <Heading as={'h2'}>{essay.title}</Heading>
        </Flex>

        {essay?.seriesName && (
          <Flex gap={theme.space['4']} alignItems="center">
            <Heading as={'h4'} fontSize={theme.fontSizes.lg}>
              {essay.seriesName}
            </Heading>
            <Select value={essay.id as string} onChange={handleSeriesMove}>
              {seriesOption}
            </Select>
          </Flex>
        )}
      </Flex>

      <Flex gap={theme.space['4']} alignItems="end">
        <Stack>
          <Image
            src={generateThumbnail(essay.thumbnail, Category.Essay)}
            alt={essay.title + ' poster'}
            fallbackSrc={generateDefaultSrc(Category.Essay)}
          />
        </Stack>
        <Stack>
          <p>{(essay.logAt as string).replace('T', ' ')}</p>
          <p>{essay.status}</p>
        </Stack>
      </Flex>
    </Stack>
  )
}

export { EssayDetailInfo }

import { Category, Read } from '@/gql/types'
import { Box, Card, Flex, Heading, Image, Stack, theme } from '@chakra-ui/react'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'

const ReadDetailInfo = ({ read }: { read: Read }) => {
  return (
    <Stack>
      <Flex gap={theme.space['8']} alignItems="center">
        <Heading as={'h2'}>
          [{read.readType}] {read.title}
        </Heading>
        <Heading fontSize={theme.fontSizes.lg} as={'h4'}>
          &lt; {read.writer} &gt;
        </Heading>
      </Flex>

      <Flex gap={theme.space['6']}>
        <Stack>
          <Image
            src={generateThumbnail(read.thumbnail, Category.Read)}
            alt={read.title + '  cover'}
            fallbackSrc={generateDefaultSrc(Category.Read)}
          />
        </Stack>
        <Stack flex={1}>
          <p>{(read.logAt as string).replace('T', ' ')}</p>
          <Flex gap={theme.space['6']}>
            <p>score: {read.ratings}</p>
            <p>{read.status}</p>
          </Flex>
          <Card flex={1} p={theme.space['4']}>
            {read.overview}
          </Card>
        </Stack>
      </Flex>
    </Stack>
  )
}

export { ReadDetailInfo }

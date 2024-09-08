import { Category, Draw } from '@/gql/types'
import { Flex, Heading, Image, Stack, theme } from '@chakra-ui/react'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'

const DrawDetailInfo = ({ draw }: { draw: Draw }) => {
  return (
    <Stack>
      <Flex>
        <Heading as={'h2'}>{draw.title}</Heading>
      </Flex>

      <Flex gap={theme.space['6']}>
        <Stack>
          <Image
            src={generateThumbnail(draw.thumbnail, Category.Draw)}
            alt={draw.title + ' photo'}
          />
        </Stack>
        <Stack>
          <p>{(draw.logAt as string).replace('T', ' ')}</p>
          <p>{draw.status}</p>
          <p>{draw.drawType}</p>
        </Stack>
      </Flex>
    </Stack>
  )
}

export { DrawDetailInfo }

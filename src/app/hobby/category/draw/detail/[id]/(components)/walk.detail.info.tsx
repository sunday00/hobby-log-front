import { Category, Walk } from '@/gql/types'
import { Flex, Heading, Image, Stack, theme } from '@chakra-ui/react'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'

const WalkDetailInfo = ({ walk }: { walk: Walk }) => {
  return (
    <Stack>
      <Flex>
        <Heading as={'h2'}>{walk.title}</Heading>
      </Flex>

      <Flex gap={theme.space['6']}>
        <Stack>
          <Image
            src={generateThumbnail(walk.thumbnail, Category.Walk)}
            alt={walk.title + ' photo'}
            fallbackSrc={generateDefaultSrc(Category.Walk)}
          />
        </Stack>
        <Stack>
          {(walk?.steps ?? 0) > 0 && <p>{walk.steps} steps</p>}
          {(walk?.distance ?? 0) > 0 && <p>{walk.distance} km</p>}
          {(walk?.duration ?? 0) > 0 && <p>{walk.duration} minutes</p>}
          <p>{(walk.logAt as string).replace('T', ' ')}</p>
          <p>{walk.status}</p>
        </Stack>
      </Flex>
    </Stack>
  )
}

export { WalkDetailInfo }

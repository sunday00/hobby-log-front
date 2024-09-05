import { Category, Gallery, Status } from '@/gql/types'
import { Box, Flex, Grid, Heading, Image, Stack, theme } from '@chakra-ui/react'
import { galleryTypeToKor } from '@/libs/conv.util'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'

const GalleryDetailInfo = ({
  gallery,
  logAt,
  status,
}: {
  gallery: Gallery
  logAt: string
  status: Status
}) => {
  return (
    <Stack>
      <Flex
        className="detail-info-header"
        alignItems="end"
        gap={theme.space['2']}
      >
        <Heading as={'h2'}>{gallery.title}</Heading>
        <Heading as={'h4'} size={theme.sizes.lg}>
          ({galleryTypeToKor(gallery.galleryType ?? '')})
        </Heading>
      </Flex>

      <Flex justifyContent="space-between">
        <Box>
          <Grid templateColumns={'1fr 2fr 1fr'} gap={theme.space['8']}>
            <p>Ratings : {gallery.ratings} / 100</p>
            <p>{logAt?.replace('T', ' ')}</p>
            <p>{status}</p>
          </Grid>
          <p>{gallery.location}</p>
          <p>{gallery.overview}</p>
        </Box>
        <Box>
          <Image
            src={generateThumbnail(gallery.thumbnail ?? '', Category.Gallery)}
            alt={gallery.title + ' poster'}
            fallbackSrc={generateDefaultSrc(Category.Gallery)}
          />
        </Box>
      </Flex>
    </Stack>
  )
}

export { GalleryDetailInfo }

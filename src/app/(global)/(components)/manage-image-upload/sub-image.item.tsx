import { Box, Card, Flex, Image, theme } from '@chakra-ui/react'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'
import { Category, ImageEntity } from '@/gql/types'

const SubImageItem = ({
  title,
  image,
}: {
  title: string
  image: ImageEntity
}) => {
  return (
    <>
      <Card>
        <Flex p={theme.space['2']} gap={theme.space['2']} alignItems="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            w="40px"
            h="40px"
          >
            <Image
              src={generateThumbnail(image.path, Category.Gallery)}
              fallbackSrc={generateDefaultSrc(Category.Gallery)}
              alt={`${title}-sub${image.flag ? `-${image.flag}` : ''}`}
            />
          </Box>
          <Box>
            <p>{`<img src="${generateThumbnail(image.path, Category.Gallery)}" alt="${title}-sub${image.flag ? `-${image.flag}` : ''}" />`}</p>
          </Box>
        </Flex>
      </Card>
    </>
  )
}

export { SubImageItem }

import { Box, Button, Card, Flex, Image, theme } from '@chakra-ui/react'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'
import { Category, ImageEntity, Maybe } from '@/gql/types'
import { Icon } from '@chakra-ui/icons'
import { IoMdClose } from 'react-icons/io'
import { useMutation } from '@apollo/client'
import { deleteSubImageMutation } from '@/gql/common/common.mutation.gql'

const SubImageItem = ({
  title,
  image,
  removeFromList,
}: {
  title: string
  image: ImageEntity
  removeFromList: (path: string) => void
}) => {
  const [deleteImage] = useMutation(deleteSubImageMutation)

  const handleDeleteImage = async () => {
    const { data, errors } = await deleteImage({
      variables: { path: image.path },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
      return
    }

    removeFromList(image?.path ?? '')
  }

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
            <p>{`<img src="${generateThumbnail(image.path, Category.Gallery)}" alt="${title}-sub${image.flag ? `-${image.flag}` : ''}" width="50%" style={{ margin: '0  auto', }} />`}</p>
          </Box>
          <Box>
            <Button colorScheme={'red'} onClick={handleDeleteImage}>
              <Icon as={IoMdClose}></Icon>
            </Button>
          </Box>
        </Flex>
      </Card>
    </>
  )
}

export { SubImageItem }

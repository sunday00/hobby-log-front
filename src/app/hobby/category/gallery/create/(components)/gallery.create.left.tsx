import { Category, Gallery, GalleryType } from '@/gql/types'
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Select,
  Stack,
  theme,
} from '@chakra-ui/react'
import { galleryTypeToKor } from '@/libs/conv.util'
import { ChangeEvent, useContext } from 'react'
import GlobalContext from '@/libs/store.context'
import { generateDefaultSrc } from '@/libs/url.grnerate.util'
import { Input } from '@chakra-ui/input'

const GalleryCreateLeft = ({ gallery }: { gallery?: Gallery }) => {
  const global = useContext(GlobalContext)

  const handleChangeGalleryType = (e: ChangeEvent<HTMLSelectElement>) => {
    global.gallery.galleryInput.galleryType = GalleryType[
      e.target.value as keyof typeof GalleryType
    ] as unknown as undefined
  }

  const handleChangeThumbnailUrl = (e: ChangeEvent<HTMLInputElement>) => {
    global.gallery.galleryInput.thumbnail = e.target
      .value as unknown as undefined

    global.update(global)
  }

  return (
    <>
      <Stack>
        <FormControl>
          <FormLabel htmlFor="gallryType">gallery type</FormLabel>
          <Select
            id="gallryType"
            placeholder="gallery type"
            onChange={handleChangeGalleryType}
          >
            {Object.keys(GalleryType).map((item: string) => (
              <option key={item} value={item}>
                {galleryTypeToKor(item)}
              </option>
            ))}
          </Select>
          <FormHelperText>gallery type</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="thumbnail">thumbnail</FormLabel>
          <Input
            type="text"
            value={global.gallery.galleryInput.thumbnail ?? ''}
            onChange={handleChangeThumbnailUrl}
          />

          <Flex justifyContent="center" p={theme.space[2]}>
            <Image
              w={'90%'}
              maxW={'300px'}
              src={global.gallery.galleryInput.thumbnail}
              fallbackSrc={generateDefaultSrc(Category.Gallery)}
              alt={global.gallery.galleryInput.title ?? '' + ' poster'}
            />
          </Flex>

          <FormHelperText>thumbnail url</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor=""></FormLabel>
          // ...
          <FormHelperText>title of gallery</FormHelperText>
        </FormControl>
      </Stack>
    </>
  )
}

export { GalleryCreateLeft }

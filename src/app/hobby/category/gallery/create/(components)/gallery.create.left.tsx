import { Category, Gallery, GalleryInput, GalleryType } from '@/gql/types'
import {
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
import { ChangeEvent, useContext, useState } from 'react'
import GlobalContext from '@/libs/store.context'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'
import { Input } from '@chakra-ui/input'

const GalleryCreateLeft = ({ gallery }: { gallery?: Gallery }) => {
  const global = useContext(GlobalContext)

  const [localInput, setLocalInput] = useState<Partial<GalleryInput>>({
    galleryType: gallery?.galleryType ?? GalleryType.Solo,
    thumbnail: gallery?.thumbnail ?? '',
    ratings: gallery?.ratings ?? 0,
  })

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<GalleryInput>] = e.target
      .value as unknown as undefined
    setLocalInput(curr)

    global.gallery.galleryInput[e.target.name as keyof GalleryInput] = (e.target
      .type === 'number'
      ? Number(e.target.value)
      : e.target.value) as unknown as undefined

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
            name="galleryType"
            value={localInput.galleryType ?? GalleryType.Solo}
            onChange={handleFormChange}
          >
            {Object.keys(GalleryType).map((item: string) => (
              <option key={item} value={item.toUpperCase()}>
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
            name="thumbnail"
            value={localInput.thumbnail ?? ''}
            onChange={handleFormChange}
          />

          <Flex justifyContent="center" p={theme.space[2]}>
            <Image
              w={'90%'}
              maxW={'300px'}
              src={
                localInput.thumbnail?.startsWith('/images')
                  ? generateThumbnail(
                      localInput.thumbnail ?? '',
                      Category.Gallery,
                    )
                  : (localInput?.thumbnail ?? '')
              }
              fallbackSrc={generateDefaultSrc(Category.Gallery)}
              alt={
                (global.gallery.galleryInput.title ?? gallery?.title ?? '') +
                ' poster'
              }
            />
          </Flex>

          <FormHelperText>gallery poster url</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="ratings">ratings</FormLabel>
          <Input
            type="number"
            name="ratings"
            min={0}
            max={100}
            value={localInput.ratings ?? 0}
            onChange={handleFormChange}
          />
          <FormHelperText>ratings. 0-100</FormHelperText>
        </FormControl>
      </Stack>
    </>
  )
}

export { GalleryCreateLeft }

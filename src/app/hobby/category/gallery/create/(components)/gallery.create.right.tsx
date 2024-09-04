import { Gallery } from '@/gql/types'
import { FormControl, FormHelperText, FormLabel, Stack } from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { useContext } from 'react'
import GlobalContext from '@/libs/store.context'

const GalleryCreateRight = ({ gallery }: { gallery?: Gallery }) => {
  const global = useContext(GlobalContext)

  return (
    <>
      <Stack>
        <FormControl>
          <FormLabel htmlFor="title">title</FormLabel>
          <Input id="title" type="text" />
          <FormHelperText>title of gallery</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="location">location</FormLabel>
          <Input id="location" type="text" />
          <FormHelperText>location</FormHelperText>
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

export { GalleryCreateRight }

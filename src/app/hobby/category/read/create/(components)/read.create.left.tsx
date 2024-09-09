import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Stack,
  theme,
} from '@chakra-ui/react'
import { ThumbnailCropper } from '@/app/(global)/(components)/thumbnail.cropper'
import { Category, Hobby, Read, ReadInput, ReadType, Status } from '@/gql/types'
import React, { ChangeEvent, useState } from 'react'

const ReadCreateLeft = ({ read }: { read?: Read }) => {
  const [localInput, setLocalInput] = useState<Partial<ReadInput>>({
    readType: read?.readType ?? ReadType.Book,
  })

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<ReadInput>] = e.target
      .value as unknown as undefined
    setLocalInput(curr)
  }

  return (
    <Stack gap={theme.space['4']} mt={theme.space['4']}>
      <FormControl>
        <FormLabel htmlFor="readType">readType</FormLabel>
        <Select
          id="readType"
          name="readType"
          onChange={handleFormChange}
          value={(localInput.readType as ReadType) ?? ReadType.Book}
        >
          {Object.keys(ReadType).map((item: string) => (
            <option key={item} value={item.toUpperCase()}>
              {item}
            </option>
          ))}
        </Select>
        <FormHelperText>readType</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="thumbnail">thumbnail</FormLabel>
        <ThumbnailCropper category={Category.Read} hobby={read as Hobby} />
      </FormControl>
    </Stack>
  )
}

export { ReadCreateLeft }

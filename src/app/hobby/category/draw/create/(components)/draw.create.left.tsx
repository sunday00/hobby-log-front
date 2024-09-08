import { FormControl, FormLabel, Stack, theme } from '@chakra-ui/react'
import { Category, Draw, DrawInput, DrawType, Hobby } from '@/gql/types'
import React, { ChangeEvent, useState } from 'react'
import { ThumbnailCropperOnly } from '@/app/(global)/(components)/thumbnail.cropper-only'

const DrawCreateLeft = ({ draw }: { draw?: Draw }) => {
  const [localInput, setLocalInput] = useState<Partial<DrawInput>>({
    drawType: DrawType.Cg,
  })

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<DrawInput>] = e.target
      .value as unknown as undefined
    setLocalInput(curr)
  }

  return (
    <Stack gap={theme.space['4']} mt={theme.space['4']}>
      <FormControl>
        <FormLabel htmlFor="thumbnail">thumbnail</FormLabel>
        <ThumbnailCropperOnly category={Category.Draw} hobby={draw as Hobby} />
      </FormControl>
    </Stack>
  )
}

export { DrawCreateLeft }

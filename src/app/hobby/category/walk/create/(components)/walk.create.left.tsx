import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  theme,
} from '@chakra-ui/react'
import { ThumbnailCropper } from '@/app/(global)/(components)/thumbnail.cropper'
import { Category, Hobby, Walk, WalkInput } from '@/gql/types'
import React, { ChangeEvent, useState } from 'react'
import { Input } from '@chakra-ui/input'

const WalkCreateLeft = ({ walk }: { walk?: Walk }) => {
  const [localInput, setLocalInput] = useState<Partial<WalkInput>>({
    steps: walk?.steps ?? 0,
    distance: walk?.distance ?? 0,
    duration: walk?.duration ?? 0,
  })

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<WalkInput>] = e.target
      .value as unknown as undefined
    setLocalInput(curr)
  }

  return (
    <Stack gap={theme.space['4']} mt={theme.space['4']}>
      <FormControl>
        <FormLabel htmlFor="steps">steps</FormLabel>
        <Input
          id="steps"
          type="number"
          name="steps"
          value={localInput.steps ?? ''}
          onChange={handleFormChange}
        />
        <FormHelperText>walk steps</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="distance">distance</FormLabel>
        <Input
          id="distance"
          type="number"
          name="distance"
          value={localInput.distance ?? ''}
          onChange={handleFormChange}
        />
        <FormHelperText>walk distance (km)</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="distance">duration</FormLabel>
        <Input
          id="duration"
          type="number"
          name="duration"
          value={localInput.duration ?? ''}
          onChange={handleFormChange}
        />
        <FormHelperText>walk duration (minutes)</FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="thumbnail">thumbnail</FormLabel>
        <ThumbnailCropper category={Category.Walk} hobby={walk as Hobby} />
      </FormControl>
    </Stack>
  )
}

export { WalkCreateLeft }

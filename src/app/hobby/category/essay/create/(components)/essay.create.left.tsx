import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Stack,
} from '@chakra-ui/react'
import { Essay, EssayInput, WritingType } from '@/gql/types'
import { ChangeEvent, useContext, useState } from 'react'
import GlobalContext from '@/libs/store.context'

const EssayCreateLeft = ({ essay }: { essay?: Essay }) => {
  const global = useContext(GlobalContext)

  const [localInput, setLocalInput] = useState<Partial<EssayInput>>({
    writingType: essay?.writingType ?? WritingType.Essay,
    thumbnail: essay?.thumbnail ?? '',
    seriesName: essay?.seriesName ?? '',
  })

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<EssayInput>] = e.target
      .value as unknown as undefined
    setLocalInput(curr)

    global.essay.essayInput[e.target.name as keyof EssayInput] = (e.target
      .type === 'number'
      ? Number(e.target.value)
      : e.target.value) as unknown as undefined

    global.update(global)
  }

  return (
    <>
      <Stack>
        <FormControl>
          <FormLabel htmlFor="writingType">writing type</FormLabel>
          <Select
            id="writingType"
            placeholder="writing type"
            name="writingType"
            value={localInput.writingType ?? WritingType.Essay}
            onChange={handleFormChange}
          >
            {Object.keys(WritingType).map((item: string) => (
              <option key={item} value={item.toUpperCase()}>
                {item}
              </option>
            ))}
          </Select>
          <FormHelperText>writing type</FormHelperText>
        </FormControl>
      </Stack>
    </>
  )
}

export { EssayCreateLeft }

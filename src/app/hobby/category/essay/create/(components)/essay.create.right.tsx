import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  theme,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import React, { ChangeEvent, useContext, useState } from 'react'
import { Essay, EssayInput, GalleryInput } from '@/gql/types'
import GlobalContext from '@/libs/store.context'
import { LogStrs, splitDDHHMM, updateLogAtStr } from '@/libs/conv.util'

const EssayCreateRight = ({ essay }: { essay?: Essay }) => {
  const global = useContext(GlobalContext)

  const { DD, HH, MM } = splitDDHHMM(essay?.logAt)

  const [localInput, setLocalInput] = useState<Partial<EssayInput & LogStrs>>({
    title: essay?.title ?? '',
  })

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<EssayInput>] = e.target
      .value as unknown as undefined
    setLocalInput(curr)

    global.essay.essayInput[e.target.name as keyof EssayInput] = e.target
      .value as unknown as undefined
    global.update(global)
  }

  const handleDateTimeChange = (
    v: string | number,
    part: 'DD' | 'HH' | 'MM',
  ) => {
    const curr = { ...localInput }
    curr[('logAtStr' + part) as keyof LogStrs] = (
      part === 'DD' ? String(v) : Number(v)
    ) as never
    setLocalInput(curr)

    global.essay.essayInput.logAtStr = updateLogAtStr(
      global.essay.essayInput.logAtStr as unknown as string,
      part,
      v,
    ) as unknown as undefined
    global.update(global)
  }

  return (
    <>
      <Stack>
        <FormControl>
          <FormLabel htmlFor="title">title</FormLabel>
          <Input
            id="title"
            type="text"
            name="title"
            value={localInput.title ?? ''}
            onChange={handleFormChange}
          />
          <FormHelperText>title of gallery</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="log-str-date">writing time</FormLabel>
          <Flex gap={theme.space['4']}>
            <Input
              id="log-str-date"
              flex={3}
              name="logStrDD"
              type="date"
              value={localInput.logAtStrDD}
              onChange={(e) => handleDateTimeChange(e.target.value, 'DD')}
            />
            <Input
              id="log-str-hh"
              flex={1}
              name="logStrHH"
              type="number"
              min={0}
              max={23}
              value={localInput.logAtStrHH}
              onChange={(e) =>
                handleDateTimeChange(Number(e.target.value ?? 0), 'HH')
              }
            />
            <Input
              id="log-str-mm"
              flex={1}
              name="logStrMM"
              type="number"
              min={0}
              max={59}
              value={localInput.logAtStrMM}
              onChange={(e) =>
                handleDateTimeChange(Number(e.target.value ?? 0), 'MM')
              }
            />
          </Flex>
          <FormHelperText>YYYY-MM-DD H:m</FormHelperText>
        </FormControl>
      </Stack>
    </>
  )
}

export { EssayCreateRight }

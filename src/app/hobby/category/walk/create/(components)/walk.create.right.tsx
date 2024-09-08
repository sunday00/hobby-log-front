import { LogStrs, splitDDHHMM } from '@/libs/conv.util'
import React, { ChangeEvent, useState } from 'react'
import { Status, Walk, WalkInput } from '@/gql/types'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Stack,
  Textarea,
  theme,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'

const WalkCreateRight = ({ walk }: { walk?: Walk }) => {
  const { DD, HH, MM } = splitDDHHMM(walk?.logAt)

  const [localInput, setLocalInput] = useState<Partial<WalkInput & LogStrs>>({
    title: walk?.title ?? '',
    content: walk?.content ?? '',
    status: walk?.status ?? Status.Draft,
    logAtStrDD: DD,
    logAtStrHH: Number(HH),
    logAtStrMM: Number(MM),
  })

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<WalkInput>] = e.target
      .value as unknown as undefined
    setLocalInput(curr)
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
          <FormHelperText>title of walk</FormHelperText>
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

        <FormControl>
          <FormLabel htmlFor="content">content</FormLabel>
          <Textarea
            rows={15}
            id="content"
            name="content"
            value={localInput.content ?? ''}
            onChange={handleFormChange}
          ></Textarea>
          <FormHelperText>content body of walk</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="status">status</FormLabel>
          <Select
            id="status"
            placeholder="status"
            name="status"
            onChange={handleFormChange}
            value={(localInput.status as Status) ?? Status.Draft}
          >
            {Object.keys(Status).map((item: string) => (
              <option key={item} value={item.toUpperCase()}>
                {item}
              </option>
            ))}
          </Select>
          <FormHelperText>status</FormHelperText>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          {walk ? 'UPDATE' : 'LOG MY HOBBY'}
        </Button>
      </Stack>
    </>
  )
}

export { WalkCreateRight }
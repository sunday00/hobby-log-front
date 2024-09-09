import { LogStrs, splitDDHHMM } from '@/libs/conv.util'
import React, { ChangeEvent, useState } from 'react'
import { Status, Read, ReadInput } from '@/gql/types'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Select,
  Stack,
  Textarea,
  theme,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'

const ReadCreateRight = ({ read }: { read?: Read }) => {
  const { DD, HH, MM } = splitDDHHMM(read?.logAt)

  const [localInput, setLocalInput] = useState<Partial<ReadInput & LogStrs>>({
    title: read?.title ?? '',
    content: read?.content ?? '',
    status: read?.status ?? Status.Draft,
    logAtStrDD: DD,
    logAtStrHH: Number(HH),
    logAtStrMM: Number(MM),
    writer: read?.writer ?? '',
    overview: read?.overview ?? '',
    ratings: read?.ratings ?? 0,
  })

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<ReadInput>] = e.target
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
        <Grid templateColumns="3fr 1fr" gap={theme.space['4']}>
          <FormControl>
            <FormLabel htmlFor="title">title</FormLabel>
            <Input
              id="title"
              type="text"
              name="title"
              value={localInput.title ?? ''}
              onChange={handleFormChange}
            />
            <FormHelperText>title of read</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="writer">writer</FormLabel>
            <Input
              id="writer"
              type="text"
              name="writer"
              value={localInput.writer ?? ''}
              onChange={handleFormChange}
            />
            <FormHelperText>author</FormHelperText>
          </FormControl>
        </Grid>

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
          <FormLabel htmlFor="overview">overview</FormLabel>
          <Textarea
            rows={3}
            id="overview"
            name="overview"
            value={localInput.overview ?? ''}
            onChange={handleFormChange}
          ></Textarea>
          <FormHelperText>briefly describe</FormHelperText>
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
          <FormHelperText>detail review</FormHelperText>
        </FormControl>

        <Grid templateColumns="3fr 1fr" gap={theme.space['4']}>
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

          <FormControl>
            <FormLabel htmlFor="ratings">ratings</FormLabel>
            <Input
              id="ratings"
              type="number"
              name="ratings"
              value={localInput.ratings ?? ''}
              onChange={handleFormChange}
            />
            <FormHelperText>read ratings</FormHelperText>
          </FormControl>
        </Grid>

        <Button type="submit" colorScheme="blue">
          {read ? 'UPDATE' : 'LOG MY HOBBY'}
        </Button>
      </Stack>
    </>
  )
}

export { ReadCreateRight }

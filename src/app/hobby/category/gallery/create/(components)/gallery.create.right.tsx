import { Gallery, GalleryInput, Status } from '@/gql/types'
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
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import GlobalContext from '@/libs/store.context'

const GalleryCreateRight = ({ gallery }: { gallery?: Gallery }) => {
  const global = useContext(GlobalContext)

  const today = new Date()
  const [localInput, setLocalInput] = useState<
    Partial<GalleryInput> & {
      logAtStrDate: string
      logAtStrHH: number
      logAtStrMM: number
    }
  >({
    title: gallery?.title ?? '',
    location: gallery?.location ?? '',
    overview: gallery?.overview ?? '',
    content: gallery?.content ?? '',
    status: gallery?.status ?? Status.Draft,
    logAtStrDate:
      `${today.getFullYear()}` +
      `-${(today.getMonth() + 1).toString().padStart(2, '0')}` +
      `-${today.getDate().toString().padStart(2, '0')}`,
    logAtStrHH: today.getHours(),
    logAtStrMM: today.getMinutes(),
  })

  useEffect(() => {
    const curr = { ...localInput }

    if (gallery) {
      const [prevDate, prevTime] = gallery.logAt.split('T')
      curr.logAtStrDate = prevDate

      const [prevHH, prevMM, _prevSS] = prevTime.split(':')
      curr.logAtStrHH = Number(prevHH)
      curr.logAtStrMM = Number(prevMM)

      setLocalInput(curr)
    }
  }, [gallery, localInput])

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<GalleryInput>] = e.target
      .value as unknown as undefined
    setLocalInput(curr)

    global.gallery.galleryInput[e.target.name as keyof GalleryInput] = e.target
      .value as unknown as undefined
    global.update(global)
  }

  const handleDateTimeChange = (
    v: string | number,
    part: 'date' | 'HH' | 'mm',
  ) => {
    const curr = { ...localInput }
    const [rawDate, rawTime] = (
      global.gallery.galleryInput.logAtStr as unknown as string
    )?.split('T') ?? [null, '00:00:00.000Z']
    const [rawHH, rawMM, _rawSS] = rawTime.split(':')
    let dt = ''

    switch (part) {
      case 'date':
        curr.logAtStrDate = v as string
        dt = v + 'T' + rawTime
        break
      case 'HH':
        curr.logAtStrHH = Number(v)
        dt =
          rawDate +
          'T' +
          v.toString().padStart(2, '0') +
          ':' +
          rawMM +
          ':00.000Z'
        break
      case 'mm':
        curr.logAtStrMM = Number(v)
        dt =
          rawDate +
          'T' +
          rawHH +
          ':' +
          v.toString().padStart(2, '0') +
          ':00.000Z'
        break
    }

    setLocalInput(curr)
    global.gallery.galleryInput.logAtStr = dt as unknown as undefined
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
          <FormLabel htmlFor="location">location</FormLabel>
          <Input
            id="location"
            type="text"
            name="location"
            value={localInput.location ?? ''}
            onChange={handleFormChange}
          />
          <FormHelperText>location</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="overview">overview</FormLabel>
          <Textarea
            rows={4}
            id="overview"
            name="overview"
            value={localInput.overview ?? ''}
            onChange={handleFormChange}
          ></Textarea>
          <FormHelperText>briefly summarize</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="content">content</FormLabel>
          <Textarea
            rows={8}
            id="content"
            name="content"
            value={localInput.content ?? ''}
            onChange={handleFormChange}
          ></Textarea>
          <FormHelperText>detail description about gallery</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="log-str-date">visit time</FormLabel>
          <Flex gap={theme.space['4']}>
            <Input
              id="log-str-date"
              flex={3}
              name="logStrDate"
              type="date"
              value={localInput.logAtStrDate}
              onChange={(e) => handleDateTimeChange(e.target.value, 'date')}
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
                handleDateTimeChange(Number(e.target.value ?? 0), 'mm')
              }
            />
          </Flex>
          <FormHelperText>YYYY-MM-DD H:m</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="gallryType">status</FormLabel>
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
          {gallery ? 'UPDATE' : 'LOG MY HOBBY'}
        </Button>
      </Stack>
    </>
  )
}

export { GalleryCreateRight }
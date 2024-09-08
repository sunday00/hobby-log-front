import { LogStrs, splitDDHHMM } from '@/libs/conv.util'
import React, { ChangeEvent, useState } from 'react'
import { Status, Draw, DrawInput, DrawType, Category } from '@/gql/types'
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Image,
  Select,
  Stack,
  Textarea,
  theme,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/input'
import { FileUploader } from 'react-drag-drop-files'
import { fileMimeTypes } from '@/libs/types'
import { generateThumbnail } from '@/libs/url.grnerate.util'

const DrawCreateRight = ({ draw }: { draw?: Draw }) => {
  const { DD, HH, MM } = splitDDHHMM(draw?.logAt)

  const [localInput, setLocalInput] = useState<Partial<DrawInput & LogStrs>>({
    title: draw?.title ?? '',
    content: draw?.content ?? '',
    status: draw?.status ?? Status.Draft,
    logAtStrDD: DD,
    logAtStrHH: Number(HH),
    logAtStrMM: Number(MM),
    mainImage: draw?.mainImage
      ? generateThumbnail(draw?.mainImage as string, Category.Draw)
      : '',
    drawType: draw?.drawType ?? DrawType.Cg,
  })

  const handleMainImageChange = (uploadFile: File) => {
    const prevLocalInput = { ...localInput }

    const reader = new FileReader()
    reader.onload = () => {
      prevLocalInput.mainImage = (reader?.result as string) ?? ''
      setLocalInput(prevLocalInput)
    }
    reader.readAsDataURL(uploadFile)
  }

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const curr = { ...localInput }
    curr[e.target.name as keyof Partial<DrawInput>] = e.target
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
        <Grid templateColumns="3fr 1fr" gap={theme.space['2']}>
          <FormControl>
            <FormLabel htmlFor="title">title</FormLabel>
            <Input
              id="title"
              type="text"
              name="title"
              value={localInput.title ?? ''}
              onChange={handleFormChange}
            />
            <FormHelperText>title of draw</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="drawType">drawType</FormLabel>
            <Select
              id="drawType"
              name="drawType"
              onChange={handleFormChange}
              value={localInput.drawType ?? DrawType.Cg}
            >
              {Object.keys(DrawType).map((item: string) => (
                <option key={item} value={item.toUpperCase()}>
                  {item}
                </option>
              ))}
            </Select>
            <FormHelperText>drawType</FormHelperText>
          </FormControl>
        </Grid>

        <FormControl>
          <FormLabel htmlFor="log-str-date">draw time</FormLabel>
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

        <Grid templateColumns="2fr 1fr" gap={theme.space['2']}>
          <FormControl>
            <FormLabel htmlFor="content">content</FormLabel>
            <Textarea
              rows={19}
              id="content"
              name="content"
              value={localInput.content ?? ''}
              onChange={handleFormChange}
            ></Textarea>
            <FormHelperText>content body of draw</FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="mainImage">mainImage</FormLabel>
            <input
              type="hidden"
              name="mainImage"
              value={localInput.mainImage ?? ''}
            />
            <FileUploader
              id="mainImage"
              handleChange={handleMainImageChange}
              name="mainFile"
              types={fileMimeTypes}
              multiple={false}
            />
            <FormHelperText>draw main image</FormHelperText>
            {localInput.mainImage && (
              <Image
                src={localInput.mainImage ?? ''}
                alt={draw ? draw.title + ' image' : 'main image'}
              />
            )}
          </FormControl>
        </Grid>

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
          {draw ? 'UPDATE' : 'LOG MY HOBBY'}
        </Button>
      </Stack>
    </>
  )
}

export { DrawCreateRight }

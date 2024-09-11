'use client'

import {
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Image,
  theme,
  Box,
} from '@chakra-ui/react'
import { FileUploader } from 'react-drag-drop-files'
import { fileMimeTypes } from '@/libs/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactCropper, { ReactCropperElement } from 'react-cropper'
import '@/app/(global)/(style)/cropper.css'
import { Input } from '@chakra-ui/input'
import { generateDefaultSrc, generateThumbnail } from '@/libs/url.grnerate.util'
import { Category, Hobby } from '@/gql/types'

const ThumbnailCropper = ({
  category,
  hobby,
}: {
  category: Category
  hobby?: Hobby
}) => {
  const cropperRef = useRef<ReactCropperElement>(null)

  const [src, setSrc] = useState('')
  const [cached, setCached] = useState(0)
  const [crop, setCrop] = useState('')

  const [url, setUrl] = useState('')

  const [fileType, setFileType] = useState<'url' | 'cropper'>('url')

  useEffect(() => {
    if (hobby?.thumbnail) {
      setUrl(generateThumbnail(hobby.thumbnail, category))
      setFileType('url')
    }
  }, [hobby?.thumbnail, category])

  const handleFileChange = (uploadFile: File) => {
    setSrc(URL.createObjectURL(uploadFile) ?? '')

    const reader = new FileReader()
    reader.readAsDataURL(uploadFile)
    reader.onload = () => setCrop(reader.result as string)
  }

  const handleCropChange = useCallback(() => {
    const cropper = cropperRef.current?.cropper

    if (!cropper) return cached

    const url = cropper?.getCroppedCanvas()?.toDataURL()
    setCrop(url!)
  }, [cached, setCrop])

  const handleUrlChange = (url: string) => {
    setUrl(url)
  }

  const handleFileTypeChange = (e: 'url' | 'cropper') => {
    setFileType(e)
  }

  return (
    <Stack>
      <RadioGroup onChange={handleFileTypeChange} value={fileType}>
        <input type="hidden" name="thumbnail-type" value={fileType} />
        <Flex gap={theme.space['2']}>
          <Radio value="url">url</Radio>
          <input type="hidden" name="thumbnail-url" value={url} />
          <Input
            type="text"
            name="thumbnail"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
        </Flex>

        <Flex gap={theme.space['2']} mt={theme.space['4']}>
          <Radio value="cropper">cropper</Radio>
          <input type="hidden" name="thumbnail-crop" value={crop} />
          <FileUploader
            handleChange={handleFileChange}
            name="file"
            types={fileMimeTypes}
            multiple={false}
          />
        </Flex>
      </RadioGroup>

      <Box>
        <Box
          className="cropper-box"
          overflow="hidden"
          h={fileType === 'url' ? 0 : 'unset'}
        >
          <ReactCropper
            ref={cropperRef}
            initialAspectRatio={1}
            src={src}
            background={false}
            responsive={true}
            zoomable={false}
            guides={true}
            cropend={() => {
              setCached(new Date().getTime())
              handleCropChange()
            }}
          />
        </Box>
        <Box
          className="url-box"
          overflow="hidden"
          h={fileType === 'cropper' ? 0 : 'unset'}
        >
          <Image
            src={url}
            alt="prepareting"
            fallbackSrc={generateDefaultSrc(category)}
          ></Image>
        </Box>
      </Box>
    </Stack>
  )
}

export { ThumbnailCropper }

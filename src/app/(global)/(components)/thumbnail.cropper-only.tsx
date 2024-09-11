'use client'

import { Flex, Stack, theme, Box } from '@chakra-ui/react'
import { FileUploader } from 'react-drag-drop-files'
import { fileMimeTypes } from '@/libs/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactCropper, { ReactCropperElement } from 'react-cropper'
import '@/app/(global)/(style)/cropper.css'
import { generateThumbnail } from '@/libs/url.grnerate.util'
import { Category, Hobby } from '@/gql/types'

const ThumbnailCropperOnly = ({
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

  useEffect(() => {
    if (hobby?.thumbnail) {
      setSrc(generateThumbnail(hobby.thumbnail, category))
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

  return (
    <Stack>
      <Flex gap={theme.space['2']} mt={theme.space['4']}>
        <input type="hidden" name="thumbnail-crop" value={crop} />
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={fileMimeTypes}
          multiple={false}
        />
      </Flex>

      <Box>
        <Box className="cropper-box">
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
      </Box>
    </Stack>
  )
}

export { ThumbnailCropperOnly }

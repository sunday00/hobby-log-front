'use client'

import { Hobby, ImageEntity, Maybe } from '@/gql/types'
import { Button, Stack, Text, theme, useDisclosure } from '@chakra-ui/react'
import { SubImageItem } from '@/app/(global)/(components)/manage-image-upload/sub-image.item'
import { SubImageModal } from '@/app/(global)/(components)/manage-image-upload/sub-image.modal'
import { Icon } from '@chakra-ui/icons'
import { FaCirclePlus } from 'react-icons/fa6'
import { useState } from 'react'

const SubImageUploader = ({ hobby }: { hobby: Hobby }) => {
  const {
    isOpen: isSubImgOpen,
    onOpen: onSubImgOnOpen,
    onClose: onSubImgOnClose,
  } = useDisclosure()

  const [imageList, setImageList] = useState<
    Maybe<ImageEntity>[] | { path: string; flag: string }[]
  >(hobby.subImages ?? [])

  const listElements = imageList.map((image: Maybe<ImageEntity>, i: number) => {
    return (
      <SubImageItem
        key={i}
        title={hobby.title ?? ''}
        image={image as ImageEntity}
      />
    )
  })

  return (
    <>
      <Stack>
        <Button onClick={onSubImgOnOpen}>
          <Icon as={FaCirclePlus} />
          <Text ml={theme.space['2']}>add sub image</Text>
        </Button>
        <Stack>{listElements}</Stack>
      </Stack>

      <SubImageModal
        hobby={hobby}
        isOpen={isSubImgOpen}
        onClose={onSubImgOnClose}
        imageList={imageList}
        setImageList={setImageList}
      />
    </>
  )
}

export { SubImageUploader }

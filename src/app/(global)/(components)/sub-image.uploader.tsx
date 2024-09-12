'use client'

import { AddSubImageInput, Hobby, ImageEntity, Maybe } from '@/gql/types'
import { Button, Stack, Text, theme, useDisclosure } from '@chakra-ui/react'
import { SubImageItem } from '@/app/(global)/(components)/manage-image-upload/sub-image.item'
import { SubImageModal } from '@/app/(global)/(components)/manage-image-upload/sub-image.modal'
import { Icon } from '@chakra-ui/icons'
import { FaCirclePlus } from 'react-icons/fa6'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { addSubImageMutation } from '@/gql/common/common.mutation.gql'

const SubImageUploader = ({ hobby }: { hobby: Hobby }) => {
  const [addSubImage] = useMutation(addSubImageMutation)

  const {
    isOpen: isSubImgOpen,
    onOpen: onSubImgOnOpen,
    onClose: onSubImgOnClose,
  } = useDisclosure()

  const [imageList, setImageList] = useState<
    Maybe<ImageEntity>[] | { path: string; flag: string }[]
  >(hobby.subImages ?? [])

  const handleImageAppend = async (formData: FormData) => {
    const last = imageList[imageList.length - 1]
    const flag =
      last == null || imageList.length === 0 ? 1 : Number(last?.flag) + 1

    const inp: AddSubImageInput = {
      id: hobby.id,
      category: hobby.category,
      url: (formData.get(
        formData.get('thumbnail-type') === 'cropper'
          ? 'thumbnail-crop'
          : 'thumbnail-url',
      ) ?? '') as string,
      logAtStr: hobby.logAt + '.000Z',
      subId: Number(flag ?? 0),
      width: 1024,
    }

    const { data, errors } = await addSubImage({
      variables: { input: inp },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.addSubImage.success) {
      console.error(data?.addSubImage.message ?? 'something went wrong')
    }

    if (data?.addSubImage.success) {
      setImageList([
        ...imageList,
        { path: data?.addSubImage.message, flag: flag.toString() },
      ])
      onSubImgOnClose()
    }
  }

  const handleImageRemove = (path: string) => {
    let target = [...imageList]
    target = target.filter((t) => t?.path !== path)
    setImageList(target)
  }

  const listElements = imageList.map((image: Maybe<ImageEntity>, i: number) => {
    return (
      <SubImageItem
        key={i}
        title={hobby.title ?? ''}
        image={image as ImageEntity}
        removeFromList={handleImageRemove}
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
        handleImageAppend={handleImageAppend}
      />
    </>
  )
}

export { SubImageUploader }

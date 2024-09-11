import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Button } from '@chakra-ui/react'
import { ThumbnailCropper } from '@/app/(global)/(components)/thumbnail.cropper'
import {
  AddSubImageInput,
  Category,
  Hobby,
  ImageEntity,
  Maybe,
} from '@/gql/types'
import { FormEvent, useRef } from 'react'
import { useMutation } from '@apollo/client'
import { addSubImageMutation } from '@/gql/common/common.mutation.gql'

const SubImageModal = ({
  hobby,
  isOpen,
  onClose,
  imageList,
  setImageList,
}: {
  hobby: Hobby
  isOpen: boolean
  onClose: () => void
  imageList: Maybe<ImageEntity>[] | { path: string; flag: string }[]
  setImageList: (
    imageList: Maybe<ImageEntity>[] | { path: string; flag: string }[],
  ) => void
}) => {
  const [addSubImage] = useMutation(addSubImageMutation)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(e.currentTarget)

    const form = new FormData(e.currentTarget)
    const flag = (hobby.subImages ?? []).length + 1 + ''

    const inp: AddSubImageInput = {
      id: hobby.id,
      category: hobby.category,
      url: (form.get(
        form.get('thumbnail-type') === 'cropper'
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
      setImageList([...imageList, { path: data?.addSubImage.message, flag }])
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="600px">
        <form onSubmit={handleSubmit}>
          <ModalHeader>Append Sub image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ThumbnailCropper category={hobby.category as Category} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              submit
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export { SubImageModal }

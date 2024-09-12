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
import { Category, Hobby } from '@/gql/types'
import { FormEvent } from 'react'

const SubImageModal = ({
  hobby,
  isOpen,
  onClose,
  handleImageAppend,
}: {
  hobby: Hobby
  isOpen: boolean
  onClose: () => void
  handleImageAppend: (formData: FormData) => void
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    handleImageAppend(form)
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

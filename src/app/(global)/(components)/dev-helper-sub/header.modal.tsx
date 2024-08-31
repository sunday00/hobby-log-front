import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Button, Textarea } from '@chakra-ui/react'

export const DevHeaderHelperModal = ({
  isOpen,
  onClose,
  accessToken,
}: {
  isOpen: boolean
  onClose: () => void
  accessToken: string
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="1000px">
        <ModalHeader>Dev Header Helper</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            name="header-helper"
            id="header-helper"
            cols={30}
            rows={10}
            readOnly={true}
            value={`{
  "Authorization": "bearer ${accessToken}"
}`}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

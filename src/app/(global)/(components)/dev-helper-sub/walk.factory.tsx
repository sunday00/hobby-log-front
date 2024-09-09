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

const rand = (min = 0, max = 100) => {
  const v = Math.floor(Math.random() * (max - min)) + min
  return v > 123 || (91 <= v && v <= 96) ? 32 : v
}

const WalkFactory = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const emptyArr = Array(40)
  const body = [...emptyArr]
    .map((_) => {
      return `\{
  category: 'WALK',
  title: '${Array(rand(1, 16))
    .fill('')
    .map((_) => String.fromCharCode(rand(65, 122)))
    .join('')}',
  content: '${Array(rand(1, 100))
    .fill('')
    .map((_) => String.fromCharCode(rand(65, 122)))
    .join('')}',
  logAt: (new Date()),
  status: 'ACTIVE',
  userId: '66b393a8610a5961246c4071'
\}`
    })
    .join(', \n')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="1000px">
        <ModalHeader>Dev MongoDB walk insert array</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            name="header-helper"
            id="header-helper"
            cols={30}
            rows={10}
            readOnly={true}
            value={`[
${body}
            ]`}
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

export { WalkFactory }

import { Button, Flex, theme } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaPencil, FaPowerOff, FaPlay } from 'react-icons/fa6'
import { IoMdTrash } from 'react-icons/io'
import { Status } from '@/gql/types'

const MovieDetailUserButton = ({ status }: { status: Status }) => {
  // TODO
  // link to button
  // activate
  // edit
  // delete

  return (
    <>
      <Flex
        mt={theme.space['4']}
        gap={theme.space['4']}
        flexDirection="row-reverse"
      >
        {status === Status.Draft ? (
          <Button colorScheme={'green'} gap={theme.space['1']}>
            <Icon as={FaPlay} />
            <span>Active</span>
          </Button>
        ) : (
          <Button colorScheme={'yellow'} gap={theme.space['1']}>
            <Icon as={FaPowerOff} />
            <span>Deprecated</span>
          </Button>
        )}

        <Button colorScheme={'blue'} gap={theme.space['1']}>
          <Icon as={FaPencil} />
          <span>EDIT</span>
        </Button>

        <Button colorScheme={'red'} gap={theme.space['1']}>
          <Icon as={IoMdTrash} />
          <span>DELETE</span>
        </Button>
      </Flex>
    </>
  )
}

export { MovieDetailUserButton }

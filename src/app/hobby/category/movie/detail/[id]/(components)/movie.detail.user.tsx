import { Button, Flex, theme } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaPencil, FaPlay, FaPowerOff } from 'react-icons/fa6'
import { IoMdTrash } from 'react-icons/io'
import { Category, Status, UpdateStatusInput } from '@/gql/types'
import { useMutation } from '@apollo/client'
import { updateStatusMutation } from '@/gql/common/common.mutation.gql'
import { useRouter } from 'next/navigation'
import { client } from '@/gql/client'

const MovieDetailUserButton = ({
  id,
  status,
}: {
  id: string
  status: Status
}) => {
  const [updateStatus] = useMutation(updateStatusMutation)
  const router = useRouter()

  // TODO
  // link to button
  // edit
  // delete

  const handleUpdateStatus = async (status: Status) => {
    const currentInput: UpdateStatusInput = {
      category: Category.Movie,
      id,
      status,
    }

    const { data, errors } = await updateStatus({
      variables: { input: currentInput },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.updateStatus?.success) {
      console.error(data?.updateStatus?.message ?? 'something went wrong')
    }

    await client.resetStore()
    await client.clearStore()

    router.refresh()
  }

  return (
    <>
      <Flex
        mt={theme.space['4']}
        gap={theme.space['4']}
        flexDirection="row-reverse"
      >
        {status !== Status.Active ? (
          <Button
            colorScheme={'green'}
            gap={theme.space['1']}
            onClick={() => handleUpdateStatus(Status.Active)}
          >
            <Icon as={FaPlay} />
            <span>Active</span>
          </Button>
        ) : (
          <Button
            colorScheme={'yellow'}
            gap={theme.space['1']}
            onClick={() => handleUpdateStatus(Status.Draft)}
          >
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

import { Button, Flex, theme } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaPencil, FaPlay, FaPowerOff } from 'react-icons/fa6'
import { IoMdTrash } from 'react-icons/io'
import { Category, Status, UpdateStatusInput } from '@/gql/types'
import { useMutation } from '@apollo/client'
import {
  deleteLogMutation,
  updateStatusMutation,
} from '@/gql/common/common.mutation.gql'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { reValidator } from '@/libs/actions'

const GalleryDetailUserButton = ({
  id,
  status,
}: {
  id: string
  status: Status
}) => {
  const [updateStatus] = useMutation(updateStatusMutation)
  const [deleteLog] = useMutation(deleteLogMutation)
  const pathName = usePathname()

  const today = new Date()

  const handleUpdateStatus = async (status: Status) => {
    const currentInput: UpdateStatusInput = {
      category: Category.Gallery,
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

    // router.refresh()
    await reValidator(pathName)
  }

  const handleDelete = async () => {
    const { data, errors } = await deleteLog({
      variables: {
        category: Category.Gallery,
        id,
      },
    })

    //TODO: more elegant handle error
    if (errors) {
      console.error(errors)
    }

    //TODO: more elegant handle error
    if (!data?.deleteLog?.success) {
      console.error(data?.deleteLog?.message ?? 'something went wrong')
    }

    location.href =
      '/hobby/monthly/' +
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1).toString().padStart(2, '0')

    return
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

        <Button
          colorScheme={'blue'}
          gap={theme.space['1']}
          as={Link}
          href={`/hobby/category/gallery/edit/${id}`}
        >
          <Icon as={FaPencil} />
          <span>EDIT</span>
        </Button>

        <Button
          colorScheme={'red'}
          gap={theme.space['1']}
          onClick={() => handleDelete()}
        >
          <Icon as={IoMdTrash} />
          <span>DELETE</span>
        </Button>
      </Flex>
    </>
  )
}

export { GalleryDetailUserButton }

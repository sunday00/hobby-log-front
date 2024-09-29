import { Category, Status, UpdateStatusInput } from '@/gql/types'
import { reValidator } from '@/libs/actions'
import { useMutation } from '@apollo/client'
import { updateStatusMutation } from '@/gql/common/common.mutation.gql'
import { useParams, usePathname } from 'next/navigation'
import { Button, theme } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { FaPlay, FaPowerOff } from 'react-icons/fa6'

const getCategory = () => {
  const matched = new RegExp(/category\/(.+)\/detail/i).exec(location.href)
  return matched?.[1] ?? ''
}

export const StatusUpdaterButton = ({ status }: { status: Status }) => {
  const pathName = usePathname()
  const [updateStatus] = useMutation(updateStatusMutation)
  const params = useParams()
  const id = params.id as string
  const category = getCategory().toUpperCase() as Category

  const handleUpdateStatus = async (status: Status) => {
    const currentInput: UpdateStatusInput = {
      category,
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

    await reValidator(pathName)
  }

  return (
    <>
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
    </>
  )
}

import { useMutation } from '@apollo/client'
import { deleteLogMutation } from '@/gql/common/common.mutation.gql'
import { useParams } from 'next/navigation'
import { Category } from '@/gql/types'
import { Button, theme } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { IoMdTrash } from 'react-icons/io'

const getCategory = () => {
  const matched = new RegExp(/category\/(.+)\/detail/i).exec(location.href)
  return matched?.[1] ?? ''
}
export const HobbyRemover = () => {
  const today = new Date()

  const [deleteLog] = useMutation(deleteLogMutation)
  const params = useParams()
  const id = params.id as string
  const category = getCategory()?.toUpperCase() as Category

  const handleDelete = async () => {
    const { data, errors } = await deleteLog({
      variables: {
        category,
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
  }

  return (
    <Button
      colorScheme={'red'}
      gap={theme.space['1']}
      onClick={() => handleDelete()}
    >
      <Icon as={IoMdTrash} />
      <span>DELETE</span>
    </Button>
  )
}

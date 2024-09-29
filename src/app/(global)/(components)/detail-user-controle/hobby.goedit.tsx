import { useParams } from 'next/navigation'
import { Button, theme } from '@chakra-ui/react'
import Link from 'next/link'
import { Icon } from '@chakra-ui/icons'
import { FaPencil } from 'react-icons/fa6'

const getCategory = () => {
  const matched = new RegExp(/category\/(.+)\/detail/i).exec(location.href)
  return matched?.[1] ?? ''
}

export const HobbyGoedit = () => {
  const params = useParams()
  const id = params.id as string

  return (
    <Button
      colorScheme={'blue'}
      gap={theme.space['1']}
      as={Link}
      href={`/hobby/category/${getCategory()}/edit/${id}`}
    >
      <Icon as={FaPencil} />
      <span>EDIT</span>
    </Button>
  )
}

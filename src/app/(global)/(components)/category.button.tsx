import { Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { Category } from '@/gql/types'
import { categoryToEmoji } from '@/libs/conv.util'

const CategoryButton = () => {
  const today = new Date()

  const items = Object.keys(Category).map((category) => {
    return (
      <MenuItem
        key={category}
        as={Link}
        href={`/hobby/category/${category.toLowerCase()}/year/${today.getFullYear()}`}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        _hover={{ fontWeight: 'bolder' }}
      >
        <Text>
          {categoryToEmoji(Category[category as keyof typeof Category])} |{' '}
          {category}
        </Text>
      </MenuItem>
    )
  })

  return (
    <Menu>
      <MenuButton>Category</MenuButton>
      <MenuList>{items}</MenuList>
    </Menu>
  )
}

export { CategoryButton }

import React from 'react'
import { Input } from '@chakra-ui/input'
import { Flex, IconButton, theme } from '@chakra-ui/react'
import { MdSearch } from 'react-icons/md'

const MovieSearchForm = ({
  handleSubmit,
  search,
  setSearch,
}: {
  handleSubmit: (e: React.FormEvent) => void
  search: string
  setSearch: (search: string) => void
}) => {
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: theme.space['4'] }}>
      <Flex gap={theme.space['2']}>
        <Input
          type="text"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <IconButton
          type="submit"
          aria-label="Search"
          icon={<MdSearch />}
        ></IconButton>
      </Flex>
    </form>
  )
}

export { MovieSearchForm }

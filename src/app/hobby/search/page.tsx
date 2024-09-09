import { HobbySearchPresentation } from '@/app/hobby/search/presentation'
import { client } from '@/gql/client'
import { searchHobbiesQuery } from '@/gql/common/common.query.gql'
import { Spinner } from '@chakra-ui/react'
import { Category } from '@/gql/types'

export const fetchCache = 'force-no-store'

const HobbySearchPage = async ({
  searchParams: { search = '', page = '1', category = undefined },
}: {
  searchParams: { search: string; page: string; category?: string }
}) => {
  const { data, loading, error } = await client.query({
    query: searchHobbiesQuery,
    variables: {
      search: search,
      page: page,
      category: category?.toUpperCase() as Category,
    },
  })

  if (loading) return <Spinner />

  if (error) {
    return (
      <>
        <p>Error...</p>
        <p>{error.message}</p>
      </>
    )
  }

  return (
    <>
      <HobbySearchPresentation
        hobbiesPage={data?.searchHobby}
        search={search}
        page={page}
        category={category as Category}
      />
    </>
  )
}

export default HobbySearchPage

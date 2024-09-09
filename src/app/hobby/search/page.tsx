import { HobbySearchPresentation } from '@/app/hobby/search/presentation'
import { client } from '@/gql/client'
import { searchHobbiesQuery } from '@/gql/common/common.query.gql'
import { Spinner } from '@chakra-ui/react'

export const fetchCache = 'force-no-store'

const HobbySearchPage = async ({
  searchParams: { search = '', page = '1' },
}: {
  searchParams: { search: string; page: string }
}) => {
  const { data, loading, error } = await client.query({
    query: searchHobbiesQuery,
    variables: {
      search: search,
      page: page,
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
        hobbies={data?.searchHobby}
        search={search}
        page={page}
      />
    </>
  )
}

export default HobbySearchPage

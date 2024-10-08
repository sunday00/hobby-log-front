import { YearlyPresentation } from '@/app/hobby/category/[category]/year/[year]/presentation'
import { CategoryLowerCase } from '@/libs/types'
import { getClient } from '@/gql/client'
import { yearlyHobbyQuery } from '@/gql/common/common.query.gql'
import { Spinner } from '@chakra-ui/react'
import { Category } from '@/gql/types'

const YearlyPage = async ({
  params: { category, year },
}: {
  params: {
    category: CategoryLowerCase
    year: string
  }
}) => {
  const { data, loading, error } = await getClient().query({
    query: yearlyHobbyQuery,
    variables: { yyyy: year, category: category.toUpperCase() as Category },
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
      <YearlyPresentation
        hobbies={data?.yearByCategory}
        year={year}
        category={category.toUpperCase() as Category}
      />
    </>
  )
}
export default YearlyPage

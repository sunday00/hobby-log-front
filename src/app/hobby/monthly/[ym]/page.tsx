import { getClient } from '@/gql/client'
import { monthlyHobbyQuery } from '@/gql/common/common.query.gql'
import { HobbyMonthlyPresentation } from '@/app/hobby/monthly/[ym]/presentation'

const HobbyMonthlyPage = async ({ params }: { params: { ym: string } }) => {
  const [yyyy, mm] = params.ym.split('-')
  const { data, error } = await getClient().query({
    query: monthlyHobbyQuery,
    variables: { yyyy, mm },
  })

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
      <HobbyMonthlyPresentation hobbies={data?.monthHobby} ym={params.ym} />
    </>
  )
}

export default HobbyMonthlyPage

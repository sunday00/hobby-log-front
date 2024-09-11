import { Spinner, Stack, theme } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { monthlyNonActivateQuery } from '@/gql/common/common.query.gql'
import { Hobby } from '@/gql/types'
import { MonthlyItem } from '@/app/hobby/monthly/[ym]/(components)/monthly.item'
import { MonthlyItemWarp } from '@/app/hobby/monthly/[ym]/(components)/monthly.item.warp'

const ManageNonActivateResult = ({
  yyyy,
  mm,
}: {
  yyyy: string
  mm: string
}) => {
  const { data, loading, error } = useQuery(monthlyNonActivateQuery, {
    variables: { yyyy, mm },
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

  const elements = data?.monthNonActiveHobby.map((hobby: Hobby, i: number) => {
    return (
      <MonthlyItemWarp key={hobby.id} justify={'center'}>
        <MonthlyItem hobby={hobby} />
      </MonthlyItemWarp>
    )
  })

  return (
    <Stack mt={theme.space['4']} alignItems="center">
      {elements}
    </Stack>
  )
}

export { ManageNonActivateResult }

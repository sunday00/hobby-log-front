import { useMy } from '@/app/(global)/(hooks)/useMy.hook'
import { Maybe, Status } from '@/gql/types'
import { Box, theme } from '@chakra-ui/react'
import { ControlDetail } from '@/app/(global)/(components)/detail-user-controle/control.detail'
import NotFound from 'next/dist/client/components/not-found-error'
import { ReactNode } from 'react'

const FilterActiveMy = ({
  children,
  content,
}: {
  children: ReactNode
  content: { userId?: Maybe<string>; status?: Maybe<Status> }
}) => {
  const my = useMy(content?.userId)

  return content.status !== Status.Active && !my ? (
    <Box overflow={'hidden'} h={'80vh'}>
      <NotFound />
    </Box>
  ) : (
    <Box maxW="6xl" mx="auto">
      <Box mt={theme.space['8']}>{children}</Box>
      <ControlDetail my={my} status={content.status!} />
    </Box>
  )
}

export { FilterActiveMy }

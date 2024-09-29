import { Flex, theme } from '@chakra-ui/react'
import { Status } from '@/gql/types'
import { HobbyRemover } from '@/app/(global)/(components)/detail-user-controle/hobby.remover'
import { StatusUpdaterButton } from '@/app/(global)/(components)/detail-user-controle/status.updater'
import { HobbyGoedit } from '@/app/(global)/(components)/detail-user-controle/hobby.goedit'

const ControlDetail = ({ status, my }: { status: Status; my: boolean }) => {
  return my ? (
    <Flex
      mt={theme.space['4']}
      gap={theme.space['4']}
      flexDirection="row-reverse"
    >
      <StatusUpdaterButton status={status} />

      <HobbyGoedit />

      <HobbyRemover />
    </Flex>
  ) : null
}

export { ControlDetail }

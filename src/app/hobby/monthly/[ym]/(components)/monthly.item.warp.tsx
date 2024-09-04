import { Flex, theme, useBreakpointValue } from '@chakra-ui/react'
import { hobby } from '@/gql/types'
import { ReactNode } from 'react'

const MonthlyItemWarp = ({
  children,
  justify,
}: {
  children: ReactNode
  justify: 'start' | 'end' | 'center'
}) => {
  const brJustify = useBreakpointValue({ base: 'center', md: justify })

  const brMargin = useBreakpointValue({
    md: (Math.random() * 150).toFixed(0) + 'px',
    base: 0,
  })

  return (
    <Flex
      key={hobby.id}
      className="monthly-item-wrap"
      gap={theme.space['4']}
      justifyContent={brJustify}
      marginLeft={justify === 'start' ? brMargin : 0}
      marginRight={justify === 'start' ? 0 : brMargin}
    >
      {children}
    </Flex>
  )
}

export { MonthlyItemWarp }

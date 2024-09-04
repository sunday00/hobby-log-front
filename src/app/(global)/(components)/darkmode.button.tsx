'use client'

import { Button, useColorMode } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'

const DarkModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Button
      bg="transparent"
      onClick={toggleColorMode}
      color={colorMode === 'dark' ? 'white' : 'black'}
    >
      <Icon as={colorMode === 'dark' ? IoMdSunny : IoMdMoon} />
    </Button>
  )
}

export { DarkModeButton }

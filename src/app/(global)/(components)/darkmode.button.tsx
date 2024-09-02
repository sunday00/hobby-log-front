'use client'

import { useEffect, useState } from 'react'
import { LocalStorage } from '@/libs/localStorage.safely.util'
import { Button } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'

const DarkModeButton = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const cur = LocalStorage.getItem('chakra-ui-color-mode')
    if (!cur || cur !== 'dark') {
      setIsDark(false)
      return
    }

    setIsDark(true)
  }, [])

  const toggleDark = () => {
    LocalStorage.setItem('chakra-ui-color-mode', isDark ? 'light' : 'dark')

    document
      .querySelector('html')
      ?.setAttribute('data-theme', isDark ? 'light' : 'dark')

    document
      .querySelector('html')
      ?.setAttribute(
        'style',
        isDark ? 'color-schema: light;' : 'color-schema: dark;',
      )

    setIsDark(!isDark)
  }

  return (
    <Button
      bg="transparent"
      onClick={() => toggleDark()}
      color={isDark ? 'white' : 'black'}
    >
      <Icon as={isDark ? IoMdSunny : IoMdMoon} />
    </Button>
  )
}

export { DarkModeButton }

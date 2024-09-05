'use client'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react'
import {
  LocalStorage,
  LocalStorage as localStorage,
} from '@/libs/localStorage.safely.util'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Icon } from '@chakra-ui/icons'
import { MdDeveloperMode, MdLogin, MdLogout, MdStar } from 'react-icons/md'
import { DevHeaderHelperModal } from '@/app/(global)/(components)/dev-helper-sub/header.modal'
import { FaPowerOff } from 'react-icons/fa6'

export const LoginButton = () => {
  const [isDev, setIsDev] = useState(false)
  const [accessToken, setAccessToken] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [name, setName] = useState('')

  const today = new Date()
  const ym =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0')

  const {
    isOpen: headerHelperIsOpen,
    onOpen: headerHelperOnOpen,
    onClose: headerHelperOnClose,
  } = useDisclosure()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const name = localStorage.getItem('userName')
    const expire = Number(localStorage.getItem('accessTokenExpired') + '000')

    if (accessToken && expire - new Date().getTime() > 0) {
      setName(name!)
      setIsLogged(true)
      setAccessToken(LocalStorage.getItem('accessToken') ?? '')
    }

    if (process.env.NODE_ENV === 'development') {
      setIsDev(true)
    }
  }, [])

  {
    return (
      <>
        {isLogged ? (
          <Menu>
            <MenuButton>{name}</MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                href="/auth/logout"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Icon as={MdLogout} />
                <span>Logout</span>
              </MenuItem>

              <MenuItem
                as={Link}
                href="/hobby/create"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Icon as={MdStar} />
                <span>Logging Hobby</span>
              </MenuItem>

              <MenuItem
                as={Link}
                href={`/hobby/non-activate/${ym}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Icon as={FaPowerOff} />
                <span>Manage NonActivated</span>
              </MenuItem>

              {isDev ? (
                <MenuItem
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={headerHelperOnOpen}
                >
                  <Icon as={MdDeveloperMode} />
                  <span>show dev header helper</span>
                </MenuItem>
              ) : (
                <></>
              )}
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            <MenuButton>Login</MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                href="/auth"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Icon as={MdLogin} />
                <span>Login</span>
              </MenuItem>
            </MenuList>
          </Menu>
        )}

        {isDev ? (
          <DevHeaderHelperModal
            isOpen={headerHelperIsOpen}
            onClose={headerHelperOnClose}
            accessToken={accessToken}
          />
        ) : (
          <></>
        )}
      </>
    )
  }
}

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  theme,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Icon } from '@chakra-ui/icons'
import { MdHome, MdMenu, MdPerson, MdStar } from 'react-icons/md'
import { IconType } from 'react-icons'

type CrumbMapItem = {
  name: string
  href: string
  icon?: IconType
  path: string[]
}

const crumbMap: { [k: string]: CrumbMapItem } = {
  auth: {
    name: 'Sign',
    href: '/auth',
    icon: MdPerson,
    path: ['auth'],
  },
  create: {
    name: 'Create',
    href: '/hobby/create',
    icon: MdMenu,
    path: ['create'],
  },
  'category.create': {
    name: '{%name%} Create',
    href: '/hobby/category/{%category%}/create',
    icon: MdStar,
    path: ['create', 'category.create'],
  },
}

const BreadcrumbWarp = ({
  name,
  category,
}: {
  name: string
  category?: string
}) => {
  const target = crumbMap[name]
  const [items, setItems] = useState<CrumbMapItem[]>([])

  useEffect(() => {
    const itemCandidates: CrumbMapItem[] = []
    target?.path.forEach((p) => {
      itemCandidates.push(crumbMap[p])
    })
    setItems(itemCandidates)
  }, [name, target, category])

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          <Icon as={MdHome} fontSize={theme.fontSizes.lg} />
          <span style={{ verticalAlign: 'text-bottom' }}>Home</span>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {items.length > 0 &&
        items.map((item, i) => (
          <BreadcrumbItem key={i} isCurrentPage={name === item.name}>
            <BreadcrumbLink
              href={item.href.replace(
                '{%category%}',
                category?.toLowerCase() ?? '',
              )}
            >
              <Icon as={item.icon} fontSize={theme.fontSizes.lg} />{' '}
              <span style={{ verticalAlign: 'text-bottom' }}>
                {item.name.replace('{%name%}', category ?? '')}
              </span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
    </Breadcrumb>
  )
}

export { BreadcrumbWarp }

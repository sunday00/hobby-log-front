import { Category } from '@/gql/types'
import { Icon } from '@chakra-ui/icons'
import { IconType } from 'react-icons'
import { FaNewspaper, FaPalette, FaShoePrints } from 'react-icons/fa6'
import { CgClapperBoard, CgImage, CgPen } from 'react-icons/cg'

const icons: Map<Category, IconType> = new Map()
icons.set(Category.Movie, CgClapperBoard)
icons.set(Category.Gallery, CgImage)
icons.set(Category.Essay, CgPen)
icons.set(Category.Draw, FaPalette)
icons.set(Category.Walk, FaShoePrints)
icons.set(Category.Read, FaNewspaper)

const Emoticon = ({ category }: { category: Category }) => {
  const icon = icons.get(category)

  return (
    <>
      <Icon fontSize="2em" as={icon} />
    </>
  )
}

export { Emoticon }

import { Button } from '@chakra-ui/react'
import { useContext } from 'react'
import GlobalContext from '@/libs/store.context'

const MovieInputBase = () => {
  const global = useContext(GlobalContext)

  const checkDevContext = () => {
    console.log(global)
  }

  return (
    <div>
      <Button onClick={checkDevContext}>check</Button>
    </div>
  )
}

export { MovieInputBase }

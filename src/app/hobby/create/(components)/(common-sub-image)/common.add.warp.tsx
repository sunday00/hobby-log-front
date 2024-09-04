import { Stack } from '@chakra-ui/react'
import { CommonAddInput } from '@/app/hobby/create/(components)/(common-sub-image)/common.add.input'
import { CommonAddResult } from '@/app/hobby/create/(components)/(common-sub-image)/common.add.result'

const CommonAddWarp = () => {
  return (
    <Stack>
      <CommonAddInput />
      <CommonAddResult />
    </Stack>
  )
}

export { CommonAddWarp }

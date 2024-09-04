'use client'

import { BreadcrumbWarp } from '@/app/(global)/(components)/breadcrumb.warp'
import { MonthlyNavControl } from '@/app/hobby/monthly/[ym]/(components)/nav.control'
import { ManageNonActivateResult } from '@/app/hobby/non-activate/[ym]/(components)/manage.nonactivate.result'

const ManageNonActivatePresentation = ({ ym }: { ym: string }) => {
  const today = new Date()
  const [yyyy, mm] = ym
    ? ym.split('-')
    : [
        today.getFullYear().toString(),
        (today.getMonth() + 1).toString().padStart(2, '0'),
      ]

  return (
    <>
      <BreadcrumbWarp name="nonActivate" dddd={ym} />
      <MonthlyNavControl yyyy={yyyy} mm={mm} manage={true} />
      <ManageNonActivateResult yyyy={yyyy} mm={mm} />
    </>
  )
}

export { ManageNonActivatePresentation }

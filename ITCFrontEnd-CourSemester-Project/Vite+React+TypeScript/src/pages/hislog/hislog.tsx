import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx'
import { HisLogContentComponent } from '../../features/panel-content/hislog-content.tsx' // @ts-ignore
import './hislog.scss'
import { useAdminRefresh } from '../../features/admin-connection/refresh'

export const HisLog: React.FC = () => {
  useAdminRefresh()
  return (
    <div className="HislogPage">
      <Headmer />
      <HisLogContentComponent />
    </div>
  )
}

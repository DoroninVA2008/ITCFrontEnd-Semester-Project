import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx'
import { HisLogContentComponent } from '../../features/panel-content/hislog-content.tsx' // @ts-ignore
import './hislog.scss'
import { useAdminRefresh } from '../../features/refresh-old/refresh.ts' // Исправить

export const HisLog: React.FC = () => {
  const { ready } = useAdminRefresh()
  return (
    <div className="HislogPage">
      <Headmer />
      {ready && <HisLogContentComponent />}
    </div>
  )
}

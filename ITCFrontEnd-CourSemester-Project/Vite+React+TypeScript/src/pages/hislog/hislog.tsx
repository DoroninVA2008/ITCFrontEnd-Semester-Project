import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx'
import { HisLogContentComponent } from '../../features/panel-content/hislog-content.tsx' // @ts-ignore
import './hislog.scss'
import { useAdminReFresh } from '../../features/refresh/saga.ts' // Исправить

export const HisLog: React.FC = () => {
  const { ready } = useAdminReFresh()
  return (
    <div className="HislogPage">
      <Headmer />
      {ready && <HisLogContentComponent />}
    </div>
  )
}

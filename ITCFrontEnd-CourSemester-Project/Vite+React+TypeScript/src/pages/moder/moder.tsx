import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx'
import { ModerContentComponent } from '../../features/panel-content/moder-content.tsx' // @ts-ignore
import '../admin/admin.scss' // @ts-ignore
import './moder.scss'
import { useAdminReFresh } from '../../features/refresh/saga.ts' // Исправить

export const Moder: React.FC = () => {
  const { ready } = useAdminReFresh()
  return (
    <div className="AdminPage">
      <Headmer />
      {ready && <ModerContentComponent />}
    </div>
  )
}

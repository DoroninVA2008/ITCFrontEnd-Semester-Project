import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx'
import { ModerContentComponent } from '../../features/panel-content/moder-content.tsx' // @ts-ignore
import '../admin/admin.scss' // @ts-ignore
import './moder.scss'
import { useAdminRefresh } from '../../features/admin-connection/login-function/ui/refresh.ts'

export const Moder: React.FC = () => {
  const { ready } = useAdminRefresh()
  return (
    <div className="AdminPage">
      <Headmer />
      {ready && <ModerContentComponent />}
    </div>
  )
}

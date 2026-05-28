import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx' // @ts-ignore
import '../../widgets/mobile.scss'
import { AdminContentComponent } from '../../features/panel-content/admin-content.tsx' // @ts-ignore
import './admin.scss'
import { useAdminReFresh } from '../../features/refresh/saga.ts' // Исправить

export const Admin: React.FC = () => {
  const { ready } = useAdminReFresh()
  return (
    <div className="AdminPage">
      <Headmer />
      {ready && <AdminContentComponent />}
    </div>
  );
}

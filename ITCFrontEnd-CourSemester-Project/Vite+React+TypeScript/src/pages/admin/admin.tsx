import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx' // @ts-ignore
import '../../widgets/mobile.scss'
import { AdminContentComponent } from '../../features/panel-content/admin-content.tsx' // @ts-ignore
import './admin.scss'
import { useAdminRefresh } from '../../features/refresh-old/refresh.ts' // Исправить

export const Admin: React.FC = () => {
  const { ready } = useAdminRefresh()
  return (
    <div className="AdminPage">
      <Headmer />
      {ready && <AdminContentComponent />}
    </div>
  );
}

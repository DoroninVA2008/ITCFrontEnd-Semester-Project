import React from 'react'
import { Heamoder } from '../../widgets/heamoder.tsx' // @ts-ignore
import '../../widgets/mobile.scss'
import { AdminContentComponent } from '../../features/panel-content/admin-content.tsx'
import { useAdminReFresh } from '../../features/refresh/saga.ts' // Исправить

export const Madder: React.FC = () => {
  useAdminReFresh()
  return (
    <div className="AdminPage">
      <Heamoder />
      <AdminContentComponent />
    </div>
  );
}
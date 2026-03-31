import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx' // @ts-ignore
import '../../widgets/mobile.scss'
import { AdminContentComponent } from '../../features/panel-content/admin-content.tsx' // @ts-ignore
import './admin.scss'

export const Admin: React.FC = () => { 
  return (
    <div className="AdminPage">
      <Headmer />
      <AdminContentComponent />
    </div>
  );
}

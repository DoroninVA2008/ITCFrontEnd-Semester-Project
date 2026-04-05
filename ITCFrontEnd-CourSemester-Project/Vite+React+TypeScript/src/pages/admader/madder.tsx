import React from 'react'
import { Heamoder } from '../../widgets/heamoder.tsx' // @ts-ignore
import '../../widgets/mobile.scss'
import { AdminContentComponent } from '../../features/panel-content/admin-content.tsx'

export const Madder: React.FC = () => { 
  return (
    <div className="AdminPage">
      <Heamoder />
      <AdminContentComponent />
    </div>
  );
}
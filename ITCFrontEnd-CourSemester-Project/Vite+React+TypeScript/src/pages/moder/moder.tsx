import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx'
import { ModerContentComponent } from '../../features/panel-content/moder-content.tsx' // @ts-ignore
import '../admin/admin.scss' // @ts-ignore
import './moder.scss'

export const Moder: React.FC = () => {

  return (
    <div className="AdminPage">
      <Headmer />
      <ModerContentComponent />
    </div>
  )
}

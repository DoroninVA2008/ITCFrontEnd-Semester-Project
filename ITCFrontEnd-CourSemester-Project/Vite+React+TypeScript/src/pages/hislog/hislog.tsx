import React from 'react'
import { Headmer } from '../../widgets/headmer.tsx'
import { HisLogContentComponent } from '../../features/panel-content/hislog-content.tsx' // @ts-ignore
import './hislog.scss'

export const HisLog: React.FC = () => {

  return (
    <div className="HislogPage">
      <Headmer />
      <HisLogContentComponent />
    </div>
  )
}

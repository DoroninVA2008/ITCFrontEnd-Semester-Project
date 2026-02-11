import React from 'react'
import { Header } from '../../widgets/header.tsx'
import { Map } from '../../features/map.tsx'
import './mapp.scss'

export const Mapp: React.FC = () => {
  return (
    <div className="MappPage">
      <Header />
      <Map />
    </div>
  );
};
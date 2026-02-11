import React from 'react'
import { Header } from '../../widgets/header.tsx'
import { Inapp } from '../../features/inapp.tsx'
import './mobile.scss'
import './index.scss'

export const App: React.FC = () => { 
  return (
    <div className="MainPage">
      <Header />
      <Inapp />
    </div>
  );
}

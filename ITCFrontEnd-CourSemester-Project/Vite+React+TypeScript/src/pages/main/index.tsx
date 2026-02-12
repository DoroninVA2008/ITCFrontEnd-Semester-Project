import React from 'react'
import { Header } from '../../widgets/header.tsx'
import { MainContent } from '../../features/main-content/main-content.tsx'
import './mobile.scss'
import './index.scss'

export const Main: React.FC = () => { 
  return (
    <div className="MainPage">
      <Header />
      <MainContent />
    </div>
  );
}

import React from 'react'
import { Header } from '../../widgets/header.tsx'
import { IndexContentComponent } from '../../features/main-content/index-content.tsx'
import './mobile.scss'
import './main.scss'

export const Index: React.FC = () => { 
  return (
    <div className="MainPage">
      <Header />
      <IndexContentComponent />
    </div>
  );
}

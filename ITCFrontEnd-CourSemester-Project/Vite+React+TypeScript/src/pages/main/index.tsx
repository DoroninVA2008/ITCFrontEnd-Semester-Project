import React from 'react'
import { Header } from '../../widgets/header.tsx'
import { MainContentComponent } from '../../features/main-content/main-content.tsx'
import './index.scss'
import './mobile.scss'

export const Main: React.FC = () => {
  return (
    <div>
      <Header />
      <MainContentComponent />
    </div>
  );
};
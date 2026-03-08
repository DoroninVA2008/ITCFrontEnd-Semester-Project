import React from 'react'
import { Header } from '../../widgets/header.tsx'
import { IndexContentComponent } from '../../features/main-content/index-content.tsx' //@ts-ignore
import './mobile.scss' //@ts-ignore
import './main.scss'

export const Index: React.FC = () => { 
  return (
    <div className="MainPage">
      <Header onOpenModal={function (): void {
        throw new Error('Function not implemented.')
      }} />
      <IndexContentComponent />
    </div>
  );
}

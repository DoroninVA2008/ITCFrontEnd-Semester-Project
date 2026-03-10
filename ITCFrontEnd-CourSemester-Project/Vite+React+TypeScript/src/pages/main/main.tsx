import React, { useState } from 'react'
import { Header } from '../../widgets/header.tsx'
import { SuggestEventModal } from '../../features/form-content/modal.tsx'
import { MainContentComponent } from '../../features/main-content/ui/main-content.tsx' // @ts-ignore
import './mobile.scss' // @ts-ignore
import './main.scss'

export const Main: React.FC = () => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
      <div>
        <Header onOpenModal={openModal} />
        <SuggestEventModal 
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        <MainContentComponent />
      </div>
    );
}

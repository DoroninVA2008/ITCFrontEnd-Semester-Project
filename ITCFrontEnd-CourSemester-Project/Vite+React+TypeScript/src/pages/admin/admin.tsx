import React, { useState } from 'react'
import { Header } from '../../widgets/header.tsx'
import { SuggestEventModal } from '../../features/form-dispatch/modal.tsx' // @ts-ignore
import '../../widgets/mobile.scss'
import { AdminContentComponent } from '../../features/admin-content/admin-content.tsx' // @ts-ignore
import './admin.scss'

export const Admin: React.FC = () => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
      <div className="AdminPage">
        <Header onOpenModal={openModal} />
        <SuggestEventModal 
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        <AdminContentComponent />
      </div>
    );
}

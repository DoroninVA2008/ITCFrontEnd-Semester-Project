import React, { useState } from 'react'
import { Header } from '../../widgets/header.tsx'
import { SuggestEventModal } from '../../features/form-content/modal.tsx'
import { Map } from '../../features/map-content/map.tsx'
import './mapp.scss'

export const Mapp: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="MappPage">
      <Header onOpenModal={openModal} />
      <SuggestEventModal 
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <Map />
    </div>
  );
};
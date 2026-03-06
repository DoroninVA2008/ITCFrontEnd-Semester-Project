import React from 'react'

export interface HeaderProps {
  onOpenModal: () => void
}

export const Butoform: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <button onClick={onOpenModal}>
      Предложить событие
    </button>
  );
};
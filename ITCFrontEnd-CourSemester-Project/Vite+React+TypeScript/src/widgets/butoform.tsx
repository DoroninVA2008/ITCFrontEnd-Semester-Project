import React from 'react'
import { HeaderProps } from './header'

export const Butoform: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <button onClick={onOpenModal}>
      Предложить событие
    </button>
  );
};
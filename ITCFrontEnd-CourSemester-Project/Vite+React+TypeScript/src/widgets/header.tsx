import React from 'react'
import { Butoapp } from '../features/main-content/butoapp'
import { Buterm } from '../features/main-content/buterm'
import { Butoform } from '../features/main-content/butoform'

export interface HeaderProps {
  onOpenModal: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return(
    <header>
      <Butoapp />
      <Buterm />
      <Butoform onOpenModal={onOpenModal} />
    </header>
  );
};
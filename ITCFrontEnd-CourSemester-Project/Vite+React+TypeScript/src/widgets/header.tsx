import React from 'react'
import { Butoapp } from './butoapp'
import { Buterm } from './buterm'
import { Butoform } from './butoform'

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
import React from 'react'
import { Butoapp } from '../features/main-content/butoapp'
import { Butoform, HeaderProps } from '../features/main-content/butoform'

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return(
    <header>
      <Butoapp />
      <h1>
        Россия - страна Героев
      </h1>
      <Butoform onOpenModal={onOpenModal} />
    </header>
  );
};
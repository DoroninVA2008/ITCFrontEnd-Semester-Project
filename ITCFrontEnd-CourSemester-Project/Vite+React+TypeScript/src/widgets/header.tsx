import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenModal: () => void; // Переименовал для ясности
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return(
    <header>
      <Link to="/app">
        <img src="/RussianHeroesLogo.png" alt="Логотип Россия - страна Героев" />
      </Link>
      <h1>
        Россия - страна Героев
      </h1>
      <button onClick={onOpenModal}>
        Предложить событие
      </button>
    </header>
  );
};
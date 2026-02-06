import React from 'react';
import { Mapp } from './map.tsx';
import './map.scss';

export const Map: React.FC = () => {
  return (
    <div>
      <h2>Добро пожаловать на Главную страницу!</h2>
      <p>Это наш основной контент.</p>
      <Mapp />
    </div>
  );
};
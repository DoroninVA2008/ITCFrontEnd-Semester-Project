import React from 'react'
import { Butomap } from './butomap'
import { TitlesContentComponent } from './titles-content'

export const MainContentComponent: React.FC = () => {
  return (
    <div className="RussianFon">
      <TitlesContentComponent />
      <Butomap />
    </div>
  );
};
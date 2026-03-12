import React from 'react'
import { Butomap } from '../butomap'
import { TitlesContentComponent } from './titles-content'

export const IndexContentComponent: React.FC = () => {

  console.log('qqq');
  return (
    <div className="RussianFon">
      <TitlesContentComponent />
      <Butomap />
    </div>
  );
};
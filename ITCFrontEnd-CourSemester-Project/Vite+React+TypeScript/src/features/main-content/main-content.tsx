import React from 'react'
import { useSelector } from 'react-redux'
import { MainContent } from './index'
import { Butomap } from './butomap'

export const MainContentComponent: React.FC = () => {
  const titleH1Text = useSelector(MainContent.selectors.selectH1);
  const titleH2Text = useSelector(MainContent.selectors.selectH2);
  const titleH3Text = useSelector(MainContent.selectors.selectH3);

  return (
    <div className="RussianFon">
      <div className="RussianText">
        <div>
          {titleH1Text}
        </div>
        <div
          style={{animationDelay: `${titleH2Text.length * 0.6}s`}}
        >
          {titleH2Text}
        </div>
        <div 
          style={{animationDelay: `${titleH2Text.length * 1.2}s`}}
        >
          {titleH3Text}
        </div>
      </div>
      <Butomap />
    </div>
  );
};
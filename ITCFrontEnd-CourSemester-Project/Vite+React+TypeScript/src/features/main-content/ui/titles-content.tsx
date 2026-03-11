import React from 'react'
import { useSelector } from 'react-redux'
import { MainContent } from '../index'

export const TitlesContentComponent: React.FC = () => {
  const titleH1Text = useSelector(MainContent.selectors.selectH1);
  const titleH2Text = useSelector(MainContent.selectors.selectH2);
  const titleH3Text = useSelector(MainContent.selectors.selectH3);
  // const needAnimated = useSelector(MainContent.selectors.selectNeedAnimated);
  // {classNames('RussianFon', {animated: needAnimated})}
  return (
      <div className="RussianText">
        <div className="">
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
  );
};
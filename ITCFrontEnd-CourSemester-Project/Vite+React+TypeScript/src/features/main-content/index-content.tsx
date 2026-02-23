import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MainContent } from './index'

export const IndexContentComponent: React.FC = () => {
  const titleH1Text = useSelector(MainContent.selectors.selectH1);
  const titleH2Text = useSelector(MainContent.selectors.selectH2);
  const titleH3Text = useSelector(MainContent.selectors.selectH3);

  return (
    <div className="RussianFon">
      <div className="RussianText">
        <div>
          {titleH1Text}
        </div>
        <div>
          {titleH2Text}
        </div>
        <div>
          {titleH3Text}
        </div>
      </div>
      <Link to="/map">
        <button>
          Перейти к карте →
        </button>
      </Link>
    </div>
  );
};
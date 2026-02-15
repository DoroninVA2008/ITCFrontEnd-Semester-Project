import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/store'

export const MainContent: React.FC = () => {
  const titleH1 = useSelector((state: RootState) => state.title1.titleH1);
  const titleH2 = useSelector((state: RootState) => state.title2.titleH2);
  const titleH3 = useSelector((state: RootState) => state.title3.titleH3);
  return (
    <div className="RussianFon">
      <div className="RussianText"> 
        <div dangerouslySetInnerHTML={{ __html: titleH1 }} />
        <div dangerouslySetInnerHTML={{ __html: titleH2 }} />
        <div dangerouslySetInnerHTML={{ __html: titleH3 }} />
      </div>
      <Link to="/map">
        <button>
          Перейти к карте →
        </button>
      </Link>
    </div>
  );
};
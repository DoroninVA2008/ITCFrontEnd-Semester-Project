import React from 'react'
import { Link } from 'react-router-dom'
import { Map } from './map.tsx'
import './mapp.scss'

export const Mapp: React.FC = () => {
  return (
    <div className="MappPage">
      <header>
        {/* Link теперь работает корректно, используя контекст BrowserRouter */}
        <Link to="/app">
          <img src="/RussianHeroesLogo.png" alt="Логотип Россия - страна Героев"></img>
        </Link>
        <h1>
          Россия - страна Героев
        </h1>
        <button>
          Предложить событие
        </button>
      </header>
      <Map />
    </div>
  );
};
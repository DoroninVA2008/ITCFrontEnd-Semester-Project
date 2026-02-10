import React from 'react';
import { Link } from 'react-router-dom'
import './mobile.scss'
import './index.scss'

export const App: React.FC = () => { 
  return (
    <div className="MainPage">
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

      <div className="RussianFon">
        <div className="RussianText">
          <h1>
            Россия —
              <br />
                страна героев
          </h1>
          <h2>
            Интерактивная карта исторических
              <br />
                событий
          </h2>
          <h3>
            Исследуйте историю. Сохраняйте память. Добавляйте события на общую карту подвигов.
          </h3>
        </div>
        <Link to="/map"> {/* Link также работает корректно */}
          <button>
            Перейти к карте →
          </button>
        </Link>
      </div>
    </div>
  );
}

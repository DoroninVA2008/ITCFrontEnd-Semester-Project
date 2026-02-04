import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import './mobile.scss';
import './index.scss';

function App() {
  return (
    <div>
      <header>
        <a href="/public/index.html">
          <img src="/RussianHeroesLogo.png" alt="Логотип Россия - страна Героев"></img>
        </a>
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
        <button>
          Перейти к карте →
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
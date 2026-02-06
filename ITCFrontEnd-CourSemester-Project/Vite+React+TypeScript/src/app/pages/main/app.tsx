import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import './mobile.scss';
import './index.scss';

function App() {
  return (
  <Router>
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
        <Link to="/map">
          <button>
            Перейти к карте →
          </button>
        </Link>
      </div>
      <main>
        <Routes>
            <Route path="/Map" element={<Map />} />
        </Routes>
      </main>
    </div>
  </Router>
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
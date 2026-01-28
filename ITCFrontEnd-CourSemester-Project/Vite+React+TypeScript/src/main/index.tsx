import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { Mapp } from '../map/map.tsx';
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
      <Mapp />
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
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store.ts'
// import { Index } from '../pages/main/main.tsx'
import { Main } from '../pages/main/index.tsx'
import { Mapp } from '../pages/map/mapp.tsx'

const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/app" element={<Main />} />
              <Route path="/map" element={<Mapp />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
  }
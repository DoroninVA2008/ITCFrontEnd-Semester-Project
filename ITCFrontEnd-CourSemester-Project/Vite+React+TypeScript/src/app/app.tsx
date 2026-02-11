import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { App } from '../pages/main/index.tsx'
import { Mapp } from '../pages/map/mapp.tsx'

const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/app" element={<App />} />
              <Route path="/map" element={<Mapp />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </React.StrictMode>
    );
  }
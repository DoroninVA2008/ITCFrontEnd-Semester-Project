import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { AppCounter } from './components/app-counter.tsx';
import { AppInput } from './components/app-input.tsx';
import { AppButtons } from './components/app-buttons.tsx';
import { store, RootState } from './store.ts'; 
import { reset, setValue } from './counter.ts';
import './index.scss';

const MIN_LIMIT = -1000;
const MAX_LIMIT = +1000;

function App() {
  const [step, setStep] = useState(1);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const updateValue = (nextValue: number) => {
    // Math.max(-1000, Math.min(1000, nextValue))
    const clampedValue = Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, nextValue));
    dispatch(setValue(clampedValue));
  };

  const handleIncrement = () => updateValue(count + step);
  const handleDecrement = () => updateValue(count - step);
  const handleReset = () => dispatch(reset());

  const isIncrementDisabled = step >= 0 ? count >= MAX_LIMIT : count <= MIN_LIMIT;

  const isDecrementDisabled = step >= 0 ? count <= MIN_LIMIT : count >= MAX_LIMIT;

  const buttonsConfig = [
    {
      key: 'dec',
      onClick: step >= 0 ? handleDecrement : handleIncrement,
      disabled: step >= 0 ? isDecrementDisabled : isIncrementDisabled,
      label: (s: number) => (s >= 0 ? `-${Math.abs(s)}` : `+${Math.abs(s)}`),
    },
    {
      key: 'reset',
      onClick: handleReset,
      disabled: false,
      label: 'Сбросить',
    },
    {
      key: 'inc',
      onClick: step >= 0 ? handleIncrement : handleDecrement,
      disabled: step >= 0 ? isIncrementDisabled : isDecrementDisabled,
      label: (s: number) => (s >= 0 ? `+${Math.abs(s)}` : `-${Math.abs(s)}`),
    },
  ];

  return (
    <div style={{ textAlign: 'center', color: 'var(--ckara-color)', padding: '20px' }}>
      <h1>Hello, Vite+React+TypeScript!</h1>
      <AppCounter count={count} />
      <AppInput onChange={(newStep: number) => setStep(newStep)} />
      <AppButtons buttons={buttonsConfig} step={step} />
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
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { AppCounter } from './components/app-counter.tsx'
import { AppInput } from './components/app-input.tsx'
import { AppButtons } from './components/app-buttons.tsx'
import { store, RootState } from './store.ts' 
import { reset, setValue } from './counter.ts'
import './index.scss'

function App() {
  const [step, setStep] = useState(1);
  // Юзаем RootState, чтобы TS видел наш counter
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    const next = Math.min(1000, count + step);
    dispatch(setValue(next));
  };

  const handleDecrement = () => {
    const next = Math.max(-1000, count - step);
    dispatch(setValue(next));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const isIncrementDisabled = step >= 0 ? count >= 1000 : count <= -1000;
  const isDecrementDisabled = step >= 0 ? count <= -1000 : count >= 1000;

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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Hello, Vite+React+TypeScript!</h1>
      <AppCounter count={count} />
      <AppInput onChange={(newStep) => setStep(newStep)} />
      <AppButtons buttons={buttonsConfig} step={step} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
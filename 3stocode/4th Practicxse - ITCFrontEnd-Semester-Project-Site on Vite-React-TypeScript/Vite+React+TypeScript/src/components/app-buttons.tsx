import React from 'react';

interface ButtonConfig {
  key: string | number; 
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  disabled?: boolean; 
  label: string | ((step: number) => React.ReactNode); 
}

interface AppButtonsProps {
  buttons: ButtonConfig[];
  step: number; 
}

export function AppButtons({ buttons, step }: AppButtonsProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
      {buttons.map(({ key, onClick, disabled, label }) => (
        <button
          key={key}
          onClick={onClick}
          disabled={disabled}
          style={{ padding: '10px 15px', color: 'var(--ckara-color)', cursor: 'pointer', backgroundColor: 'transparent', borderColor: 'var(--ckara-color)' }}
        >
          {/* TypeScript теперь понимает, что label может быть функцией, принимающей number */}
          {typeof label === 'function' ? label(step) : label}
        </button>
      ))}
    </div>
  );
}

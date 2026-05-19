// import React from 'react';

interface AppCounterProps {
  count: number; // Указываем, что 'count' должен быть числом
}

// Используем интерфейс для аннотации пропсов
export function AppCounter({ count }: AppCounterProps) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
      <h2>Реактивный Счётчик: {count}</h2>
    </div>
  );
}

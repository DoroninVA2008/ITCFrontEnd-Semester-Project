import React from 'react';
import { SubDropdownBtn } from './dropbtn.tsx'; // Путь к твоей кнопке
import { useEventFilterContext } from '../filters/evenFilterProvider'; // Путь к твоему провайдеру

export const YourFilterUIComponent: React.FC = () => {
  const { filters, toggleEventType } = useEventFilterContext();
  const { selectedEventTypes } = filters;

  return (
    <div className="event-filters">
      <h3>Фильтры событий</h3>
      <SubDropdownBtn
        label="Политические события"
        isSelected={selectedEventTypes.has(1)} // Предполагаем type: 1 для политических
        isInRange={true} // Пока не актуально для фильтрации по типу, но пропс требует
        onClick={() => {}} // Тут не нужен отдельный клик, только чекбокс
        onCheckboxChange={() => toggleEventType(1)}
      />
      <SubDropdownBtn
        label="Военные события"
        isSelected={selectedEventTypes.has(2)} // Предполагаем type: 2 для военных
        isInRange={true}
        onClick={() => {}}
        onCheckboxChange={() => toggleEventType(2)}
      />
      {/* Добавь другие фильтры по необходимости */}
    </div>
  );
};
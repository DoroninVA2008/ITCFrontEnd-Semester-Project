import React, { useState, useMemo } from 'react';
import { ActiveFilterDropdown } from './activedropdown';
import { useEventFilterContext } from '../filters/evenFilterProvider'; // Твой контекст
import { FilterConfig, HistoricalPeriod } from './typeven';

// Важно: Эти данные должны быть либо в state/constant в родительском компоненте
// который оборачивает ActiveFilterDropdown, либо получены из API.
// Пока зададим их жестко для примера.
const ALL_HISTORICAL_PERIODS: HistoricalPeriod[] = [
  { id: 'period1', label: 'Древняя Русь', startYear: 862, endYear: 1240 },
  { id: 'period2', label: 'Московское царство', startYear: 1240, endYear: 1721 },
  { id: 'period3', label: 'Российская Империя', startYear: 1721, endYear: 1917 },
  { id: 'period4', label: 'СССР', startYear: 1917, endYear: 1991 },
  { id: 'period5', label: 'Современная Россия', startYear: 1991, endYear: 2026 },
];

// Карта для преобразования строковых лейблов в числовые eventType
const EVENT_TYPE_MAP: { [key: string]: number } = {
    'Политические события': 1,
    'Военные события': 2,
    // Добавь другие типы, если у тебя есть
};
const EVENT_TYPE_LABELS_MAP: { [key: number]: string } = {
    1: 'Политические события',
    2: 'Военные события',
};

export const FilterWrapper: React.FC = () => {
    // Получаем состояние фильтров и функции для их изменения из контекста
    const { 
        filters, 
        toggleEventType, 
        setPeriodRange, 
        setSelectedPeriodLabel // Это функция, которую, я так понимаю, ты передаешь для periodLabel
    } = useEventFilterContext();

    // Преобразуем Set<number> в объект { [string]: boolean } для `selectedOptions` в ActiveFilterDropdown
    const selectedOptionsForDropdown = useMemo(() => {
        const options: { [key: string]: boolean } = {};
        Object.values(EVENT_TYPE_LABELS_MAP).forEach(label => {
            const eventType = EVENT_TYPE_MAP[label];
            options[label] = filters.selectedEventTypes.has(eventType);
        });
        return options;
    }, [filters.selectedEventTypes]);

    // Обработчик для переключения опций (типов событий)
    const handleOptionToggle = (optionLabel: string) => {
        const eventType = EVENT_TYPE_MAP[optionLabel];
        if (eventType !== undefined) {
            toggleEventType(eventType); // Вызываем функцию из контекста
        }
    };

    // Обработчик для выбора исторического периода (кнопка)
    const handlePeriodClick = (period: HistoricalPeriod) => {
        setSelectedPeriodLabel(period.label); // Обновляем выбранный лейбл периода в контексте
        setPeriodRange(period.startYear, period.endYear); // Обновляем диапазон в контексте
    };
    
    // Определяем конфигурации наших фильтров
    const eventTypeFilterConfig: FilterConfig = {
      id: 'event-type-filter',
      label: 'Тип события',
      type: 'options',
    };

    const periodFilterConfig: FilterConfig = {
      id: 'period-filter',
      label: 'Выбор периода',
      type: 'period',
    };

    return (
        <div className="filters-panel">
            {/* Первый ActiveFilterDropdown для типов событий */}
            <ActiveFilterDropdown
                filterIndex={0}
                filter={eventTypeFilterConfig}
                periodRange={filters.periodRange} // Текущий диапазон из контекста
                selectedPeriod={filters.selectedPeriodLabel} // Выбранный период из контекста
                selectedOptions={selectedOptionsForDropdown} // Уже преобразованные опции
                historicalPeriods={ALL_HISTORICAL_PERIODS} // Все периоды
                onPeriodChange={setPeriodRange} // Функция из контекста
                onPeriodSelect={setSelectedPeriodLabel} // Функция из контекста
                onPeriodClick={handlePeriodClick} // Наш обработчик, который вызывает 2 функции контекста
                onOptionToggle={handleOptionToggle} // Наш обработчик для типов событий
            />

            {/* Второй ActiveFilterDropdown для диапазона годов и исторических периодов */}
            <ActiveFilterDropdown
                filterIndex={1}
                filter={periodFilterConfig}
                periodRange={filters.periodRange}
                selectedPeriod={filters.selectedPeriodLabel}
                selectedOptions={{}} // Для этого фильтра неактуально
                historicalPeriods={ALL_HISTORICAL_PERIODS}
                onPeriodChange={setPeriodRange}
                onPeriodSelect={setSelectedPeriodLabel}
                onPeriodClick={handlePeriodClick}
                onOptionToggle={() => {}} // Для этого фильтра неактуально
            />
        </div>
    );
};
import { EventType } from '../marker-location/evenPositions'
import { eventsListDates } from '../../app/saga/cons.ts'

export interface FilterConfig {
  options: any;
  id: string;
  label: string;
  type: 'period' | 'options';
}

export interface HistoricalPeriod {
  label: string;
  startYear: number;
  endYear: number;
}

export interface EventDates {
    id: number;
    title: string;
    description: string;
    latitude: string;
    longitude: string;
    eventDate: string;
    eventType: EventType;
    previewUrlImage: string;
}

export interface EventTypeItem {
    id: number;
    name: string;
    description: string;
}

export interface DateRange {
    dateFrom: string;
    dateTo: string;
}

interface ApiResponse {
    objects: EventDates[];
}

export interface FilterRequestData {
    eventTypeIds: number[];
    dateFrom: string;
    dateTo: string;
    // periodLabel: string | null;
}

const OPTION_TO_EVENT_TYPE_NAME: Record<string, string> = {
    'Битвы': 'Военная операция',
    'Войны': 'Войны',
    'Революции': 'Расстрел/Расправа',
    'Восстания': 'Восстание/Бунт',
    'Перевороты': 'Пограничный конфликт'
};

const FALLBACK_NAME_TO_ID: Record<string, number> = {
    'Расстрел/Расправа': 1,
    'Военная операция': 2,
    'Пограничный конфликт': 3,
    'Восстание/Бунт': 4,
    'Войны': 5
};

export const mapSelectedOptionsToEventTypeIds = (
    selectedOptions: { [key: string]: boolean },
    eventTypes: EventTypeItem[]
): number[] => {
    const selectedNames = new Set<string>();
    Object.entries(selectedOptions).forEach(([option, isSelected]) => {
        if (!isSelected) return;
        const mappedName = OPTION_TO_EVENT_TYPE_NAME[option] ?? option;
        selectedNames.add(mappedName);
    });

    if (eventTypes.length > 0) {
        return eventTypes
            .filter((eventType) => selectedNames.has(eventType.name))
            .map((eventType) => eventType.id);
    }

    return Array.from(selectedNames)
        .map((name) => FALLBACK_NAME_TO_ID[name])
        .filter((id): id is number => typeof id === 'number');
};

// Новая функция для форматирования года с ведущими нулями до 4 знаков
const formatYearForApi = (year: number): string => {
    return year.toString().padStart(4, '0');
};

export const buildFilterRequestData = (params: {
    selectedOptions: { [key: string]: boolean };
    periodRange: { min: number; max: number };
    selectedPeriod: string | null;
    eventTypes?: EventTypeItem[];
}): FilterRequestData => {
    const eventTypeIds = mapSelectedOptionsToEventTypeIds(
        params.selectedOptions,
        params.eventTypes ?? []
    );

    // Форматируем годы с ведущими нулями для API
    const formattedMinYear = formatYearForApi(params.periodRange.min);
    const formattedMaxYear = formatYearForApi(params.periodRange.max);

    return {
        eventTypeIds,
        dateFrom: `${formattedMinYear}-01-01`,
        dateTo: `${formattedMaxYear}-12-31`,
        // periodLabel: params.selectedPeriod,
    };
};

export async function fetchEvents(): Promise<EventDates[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(eventsListDates, {
            method: 'GET',
            signal: controller.signal,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);}
        const data: ApiResponse = await response.json();
        if (!data || !Array.isArray(data.objects)) {
            return [];
        }
        return data.objects;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        return [];
    }
}

export async function fetchEventsByFilters(payload: FilterRequestData): Promise<EventDates[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        console.log('Отправляемый payload на бэкенд:', payload); // Для отладки

        const response = await fetch(eventsListDates, {
            method: 'GET',
            signal: controller.signal,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        if (!data || !Array.isArray(data.objects)) {
            return [];
        }
        return data.objects;
    } catch (error) {
        console.error('Failed to fetch events by filters:', error);
        return [];
    }
}
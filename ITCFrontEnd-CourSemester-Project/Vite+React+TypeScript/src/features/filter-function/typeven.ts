import { EventType } from '../event-location/evenPositions'
import { eventsListDates, eventsListTypes } from '../../app/saga/saga.ts'

// type FilterOption = string;

export interface FilterConfig {
  options: any;
  id: string;
  label: string;
  type: 'period' | 'options'; // Например, 'period' для слайдера, 'options' для типов событий
  // Дополнительные свойства, если нужны, например, для option-фильтров
  // options?: { label: string; value: string | number }[];
}

export interface HistoricalPeriod {
  // id: string;
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

interface EventTypesResponse {
    eventTypes: EventTypeItem[];
}

export interface FilterRequestData {
    data: number[];
    dateFrom: string;
    dateTo: string;
    periodLabel: string | null;
}

const OPTION_TO_EVENT_TYPE_NAME: Record<string, string> = {
    'Битвы': 'Военная операция',
    'Войны': 'Военная операция',
    'Революции': 'Восстание/Бунт',
    'Восстания': 'Восстание/Бунт',
    'Перевороты': 'Восстание/Бунт'
};

const FALLBACK_NAME_TO_ID: Record<string, number> = {
    'Расстрел/Расправа': 1,
    'Военная операция': 2,
    'Пограничный конфликт': 3,
    'Восстание/Бунт': 4
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

export const buildFilterRequestData = (params: {
    selectedOptions: { [key: string]: boolean };
    periodRange: { min: number; max: number };
    selectedPeriod: string | null;
    eventTypes?: EventTypeItem[];
}): FilterRequestData => {
    const data = mapSelectedOptionsToEventTypeIds(
        params.selectedOptions,
        params.eventTypes ?? []
    );

    return {
        data,
        dateFrom: `${params.periodRange.min}-01-01`,
        dateTo: `${params.periodRange.max}-12-31`,
        periodLabel: params.selectedPeriod,
    };
};

export async function fetchEventTypes(): Promise<EventTypeItem[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(eventsListTypes, {
            method: 'POST',
            signal: controller.signal,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        clearTimeout(timeoutId);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: EventTypesResponse = await response.json();
        if (!data || !Array.isArray(data.eventTypes)) {
            return [];
        }
        return data.eventTypes;
    } catch (error) {
        console.error('Failed to fetch event types:', error);
        return [];
    }
}

export async function fetchEvents(): Promise<EventDates[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(eventsListDates, {
            method: 'POST',
            signal: controller.signal,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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
        console.error('Failed to fetch events:', error);
        return [];
    }
}

export async function fetchEventsByFilters(payload: FilterRequestData): Promise<EventDates[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(eventsListDates, {
            method: 'POST',
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

export function filterEventsByDateRange(
    events: EventDates[], 
    dateRange: DateRange
): EventDates[] {
    const fromDate = new Date(dateRange.dateFrom);
    fromDate.setHours(0, 0, 0, 0);
    
    const toDate = new Date(dateRange.dateTo);
    toDate.setHours(23, 59, 59, 999);
    
    return events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= fromDate && eventDate <= toDate;
    });
}


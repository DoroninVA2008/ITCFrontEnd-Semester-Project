import { ApiResponse, EventDates, FilterRequestData } from '../typeven'
import { eventsListDates } from '../../../entities/cons'

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

        const params = new URLSearchParams();
        if (payload.eventTypeIds && payload.eventTypeIds.length > 0) {
            payload.eventTypeIds.forEach(id => params.append('eventTypeIds', String(id)));
        }
        if (payload.dateFrom) params.append('dateFrom', payload.dateFrom);
        if (payload.dateTo) params.append('dateTo', payload.dateTo);

        const url = `${eventsListDates}?${params.toString()}`;

        const response = await fetch(url, {
            method: 'GET',
            signal: controller.signal,
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
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
        console.error('Failed to fetch events by filters:', error);
        return [];
    }
}
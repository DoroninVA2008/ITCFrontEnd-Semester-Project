import { EventType } from '../events/evenPositions.ts'

type FilterOption = string;

export interface FilterConfig {
  name: string;
  options: FilterOption[];
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

export interface DateRange {
    dateFrom: string;
    dateTo: string;
}

interface ApiResponse {
    objects: EventDates[];
}

const types_api_url = 'https://155-212-132-55.sslip.io/api/objects/get-objects-list';

export async function fetchEvents(): Promise<EventDates[]> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(types_api_url, {
                method: 'POST',
                signal: controller.signal,
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            clearTimeout(timeoutId);
        const data: ApiResponse = await response.json();
        return data.objects;
    } catch (error) {
        console.error('Failed to fetch events:', error);
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

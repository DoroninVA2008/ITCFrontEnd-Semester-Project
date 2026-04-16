import { adminList } from '../../../entities/cons'

export interface Request {
  id: string
  title: string
  date: string
  status: string
  description: string
  eventDate: string
  eventType: string
  telegram: string
  email: string
}

export const fetchRequests = async (): Promise<Request[]> => {
    try {
        const response = await fetch(adminList, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        console.log('[fetchRequests] raw response:', json);
        const data: any[] = Array.isArray(json)
            ? json
            : Array.isArray(json?.data)
            ? json.data
            : Array.isArray(json?.results)
            ? json.results
            : Array.isArray(json?.requests)
            ? json.requests
            : Array.isArray(json?.items)
            ? json.items
            : [];
        return data.map((item): Request => ({
            id: String(item.id),
            title: item.title ?? '',
            date: item.createdAt ?? item.date ?? '',
            status: item.status ?? 'new',
            description: item.description ?? '',
            eventDate: item.event_date ?? item.eventDate ?? '',
            eventType: item.event_type ?? item.eventTypeId ?? '',
            telegram: item.telegram ?? '',
            email: item.email ?? '',
        }));
    } catch (err) {
        console.error('Ошибка загрузки заявок:', err);
        return [];
    }
}

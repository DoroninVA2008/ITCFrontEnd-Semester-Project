import { adminList } from '../../../entities/cons'
import { showErrorAlert } from './errorAlert'

export interface Request {
  id: string
  title: string
  date: string
  status: string
  description: string
  eventDate: string
  eventTypeId: string
  telegram: string
  email: string
  siteUrl: string
}

export interface FetchRequestsParams {
  status?: string
  q?: string
  page?: number
  limit?: number
}

export interface FetchRequestsResult {
  requests: Request[]
  total: number
}

export const fetchRequests = async (params: FetchRequestsParams = {}): Promise<FetchRequestsResult> => {
    try {
        const query = new URLSearchParams()
        if (params.status) query.set('status', params.status)
        if (params.q)      query.set('q', params.q)
        if (params.page)   query.set('page', String(params.page))
        if (params.limit)  query.set('limit', String(params.limit))

        const url = query.toString() ? `${adminList}?${query}` : adminList

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            showErrorAlert(response.status)
            throw new Error(`HTTP ${response.status}`)
        }
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

        const total: number = typeof json?.total === 'number' ? json.total : data.length

        return {
            requests: data.map((item): Request => ({
                id: String(item.id),
                title: item.title ?? '',
                date: item.createdAt ?? item.date ?? '',
                status: item.status ?? 'new',
                description: item.description ?? '',
                eventDate: item.event_date ?? item.eventDate ?? '',
                eventTypeId: item.event_type ?? item.eventTypeId ?? '',
                telegram: item.telegram ?? '',
                email: item.email ?? '',
                siteUrl: item.siteUrl ?? item.site_url ?? item.url ?? item.website ?? item.preview_url ?? '',
            })),
            total,
        }
    } catch (err) {
        console.error('Ошибка загрузки заявок:', err);
        return { requests: [], total: 0 }
    }
}

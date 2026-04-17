import { adminCard } from '../../../entities/cons'
import { Request } from './reques'

export const fetchRequestCard = async (id: string | number): Promise<Request | null> => {
    try {
        const response = await fetch(adminCard(Number(id)), {
            method: 'GET',
            credentials: 'include',
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const item = await response.json()
        console.log('[fetchRequestCard] raw response:', item)
        console.log('[fetchRequestCard] mapped fields:', {
            id: item.request.id,
            title: item.request.title,
            description: item.request.description,
            eventDate: item.request.event_date ?? item.request.eventDate,
            eventType: item.request.event_type ?? item.request.eventType,
            telegram: item.request.telegram,
            email: item.request.email,
        })
        const r = item.request ?? item
        return {
            id: String(r.id),
            title: r.title ?? '',
            date: r.createdAt ?? r.date ?? '',
            status: r.status ?? 'new',
            description: r.description ?? '',
            eventDate: r.event_date ?? r.eventDate ?? '',
            eventTypeId: r.event_type ?? r.eventType ?? r.event_type_id ?? '',
            telegram: r.telegram ?? r.telegramUsername ?? r.telegram_username ?? '',
            email: r.email ?? '',
        }
    } catch (err) {
        console.error(`Ошибка загрузки заявки #${id}:`, err)
        return null
    }
}

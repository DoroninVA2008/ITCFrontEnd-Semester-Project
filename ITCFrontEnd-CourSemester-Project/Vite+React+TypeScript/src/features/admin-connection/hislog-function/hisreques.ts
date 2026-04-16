import { HisForm, adminReFresh } from '../../../entities/cons'

type ActionType = 'rejected' | 'approved' | 'review'

const ACTION_LABEL: Record<ActionType, string> = {
  rejected: 'Отклонение заявки',
  approved: 'Одобрение заявки',
  review:   'Взята на проверку',
}

export interface LogEntry {
  id: string
  action: ActionType
  actionLabel: string
  title: string
  requestId: string
  description: string
  moderator: string
  date: string
}

const parseHistory = async (response: Response): Promise<LogEntry[]> => {
  const json = await response.json()
  console.log('[fetchHistory] raw response:', json)
  const data: any[] = Array.isArray(json)
    ? json
    : Array.isArray(json?.data)
    ? json.data
    : Array.isArray(json?.results)
    ? json.results
    : Array.isArray(json?.history)
    ? json.history
    : Array.isArray(json?.items)
    ? json.items
    : []
  return data.map((item): LogEntry => {
    const action = (item.action ?? item.action_type ?? 'review') as ActionType
    return {
      id: String(item.id),
      action,
      actionLabel: ACTION_LABEL[action] ?? action,
      title: item.title ?? '',
      requestId: String(item.request_id ?? item.requestId ?? item.request?.id ?? ''),
      description: item.description ?? item.comment ?? '',
      moderator: item.moderator ?? item.admin ?? item.moderator_name ?? '',
      date: item.created_at ?? item.createdAt ?? item.date ?? '',
    }
  })
}

export const fetchHistory = async (): Promise<LogEntry[]> => {
  try {
    let response = await fetch(HisForm, {
      method: 'GET',
      credentials: 'include',
    })

    if (response.status === 403) {
      const refreshResp = await fetch(adminReFresh, {
        method: 'POST',
        credentials: 'include',
      })
      if (!refreshResp.ok) throw new Error(`Refresh failed: HTTP ${refreshResp.status}`)
      response = await fetch(HisForm, {
        method: 'GET',
        credentials: 'include',
      })
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return parseHistory(response)
  } catch (err) {
    console.error('Ошибка загрузки истории:', err)
    return []
  }
}
